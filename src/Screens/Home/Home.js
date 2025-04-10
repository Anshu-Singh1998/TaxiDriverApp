import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Image,
  StatusBar,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {TextInput} from 'react-native-paper';
import Compass from '../../../Assets/Compass.png';
import Destination from '../../../Assets/Destination.png';
import PhoneCall from '../../../Assets/PhoneCall.png';
import SMSIcon from '../../../Assets/SMSIcon.png';
import GoogleMarker from '../../../Assets/GoogleMarker.png';
import MapsCenter from '../../../Assets/MapsCenter.png';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import BasicTick from '../../../Assets/BasicTick.png';
import DrawerImg from '../../../Assets/DrawerImg.png';
import Bell from '../../../Assets/Bell.png';
import GetLocation from 'react-native-get-location';
import Tick from '../../../Assets/Tick.png';
import Cross from '../../../Assets/Cross.png';
import {useRoute} from '@react-navigation/native';
import HomeStyle from './HomeStyle';
import {useDispatch, useSelector} from 'react-redux';
import {changeDriverStatus} from '../../redux/Slices/OnlineSlice';
import {driverRideList} from '../../redux/Slices/DriverListSlice';
import {postTrip} from '../../redux/Slices/ridesSlice';
import {sendOtp, verifyTripOtp} from '../../redux/Slices/otpSlice';
import {startTripKM} from '../../redux/Slices/KilometerSlice';
import {
  fetchDriverEarnings,
  fetchDriverHours,
} from '../../redux/Slices/DriverEarningSlice';
import {
  fetchOngoingTrips,
  markTripArrived,
} from '../../redux/Slices/ridesSlice';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CELL_COUNT = 6; // Number of OTP boxes

const Home = ({navigation, route}) => {
  // console.log('aRoute====>>>>', route.params);
  const [modalVisible, setModalVisible] = useState(false);
  const [kmVisible, setKMVisible] = useState(false);
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [onlineModalVisible, setOnlineModalVisible] = useState(false);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState(null);
  const [tripStartModal, setTripStartModal] = useState(false);
  const [arrivedLocationModal, setArrivedLocationModal] = useState(false);
  const [arrivedUpdateModal, setArrivedUpdateModal] = useState(null);
  const [isArrived, setIsArrived] = useState(false);
  const [startRideModal, setStartRideModal] = useState(false);
  const [rideDetails, setRideDetails] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [StartRideView, setStartRideView] = useState(null);
  const [tripId, setTripId] = useState(null);
  const rideDetailsArray = [rideDetails];
  const [verifiedTripId, setVerifiedTripId] = useState(null);
  const [kmValue, setKmValue] = useState('');

  const lastScrollY = useRef(0);
  // const routeScreen = useRoute();
  const dispatch = useDispatch();
  const {status, loading} = useSelector(state => state.status);
  const rides = useSelector(state => state.driver.data);
  const tripScheduled = useSelector(state => state.trips);
  const {trip, sentOtp} = useSelector(state => state.otp);
  console.log('Trip from send otep response===>>', trip);
  console.log('otp from send otep response===>>', sentOtp);
  const km = useSelector(state => state.kilometer);
  const driver_earning = useSelector(state => state.driverEarning.driverearned);
  console.log('Driver Earningss=====>>>', driver_earning);
  const driver_hours = useSelector(state => state.driverEarning.driverhours);
  console.log('Driver Earningss=====>>>', driver_earning);

  const handleScroll = event => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY < lastScrollY.current) {
      // User scrolled up → open modal
      setMapModalVisible(true);
    }

    lastScrollY.current = currentScrollY;
  };

  const ref = useBlurOnFulfill({value: otpValue, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: setOtpValue,
  });

  const translateY = new Animated.Value(300); // Initial position below screen

  const openModal = () => {
    setMapModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMapModalVisible(false));
  };

  useEffect(() => {
    if (mapModalVisible) {
      dispatch(driverRideList());
    }
  }, [mapModalVisible, dispatch]);

  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [{color: '#f5f5f5'}], // Light gray base
    },
    {
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#ffffff'}], // White roads
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{color: '#f2f2f2'}], // Light arterial roads
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#e6e6e6'}], // Light gray for highways
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#808080'}], // Darker text for readability
    },
  ];

  useEffect(() => {
    AsyncStorage.getItem('access_token').then(token => {
      console.log('Access Token from AsyncStorage:', token);
      dispatch(fetchDriverEarnings());
      dispatch(fetchDriverHours());
    });
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.openModal) {
      setTripStartModal(true);
    }
    if (route.params?.rideDetails) {
      console.log('Ride Details (Before Setting):', route.params.rideDetails);
      setRideDetails(route.params.rideDetails);
    }
  }, [route.params]);

  const openMaps = ({pickupLat, pickupLng, dropLat, dropLng}) => {
    if (!pickupLat || !pickupLng || !dropLat || !dropLng) {
      console.warn('Missing coordinates');
      return;
    }

    let url = '';

    if (Platform.OS === 'ios') {
      // Apple Maps with both source and destination
      url = `http://maps.apple.com/?saddr=${pickupLat},${pickupLng}&daddr=${dropLat},${dropLng}&dirflg=d`;
    } else {
      // Google Maps with both source and destination
      url = `https://www.google.com/maps/dir/?api=1&origin=${pickupLat},${pickupLng}&destination=${dropLat},${dropLng}&travelmode=driving`;
    }

    Linking.openURL(url).catch(err =>
      console.error('Failed to open Maps:', err),
    );
    setKMVisible(false);
  };

  const handleConfirmStatusChange = () => {
    const newStatus = status === 'offline' ? 'online' : 'offline';
    dispatch(changeDriverStatus(newStatus)).then(() => {
      setOnlineModalVisible(false); // close modal after API call
    });
  };

  const handleStartRideTrip = async () => {
    if (!StartRideView) {
      console.error('No ride selected');
      return;
    }

    const trip_id = StartRideView?.id;
    console.log('Start Ride View=====>>>>', StartRideView);
    console.log('Start Ride View trip id =====>>>>', trip_id);

    if (!trip_id) {
      console.error('Trip ID not found in StartRideView');
      return;
    }

    try {
      // ✅ Don't rely on setTripId here
      const arrivedResponse = await dispatch(markTripArrived(trip_id)).unwrap();
      console.log('Trip marked as arrived:', arrivedResponse);

      // Send OTP request
      const otpResponse = await dispatch(sendOtp(trip_id)).unwrap();
      console.log('Recieve Otp=====>>>>', otpResponse);

      if (otpResponse) {
        const otpString = String(otpResponse); // Convert number to string
        setOtpValue(otpString);
        setModalVisible(true);
      } else {
        console.error('OTP not received in response');
      }
    } catch (error) {
      console.error('Error while sending OTP:', error);
    }
  };

  useEffect(() => {
    if (sentOtp) {
      setOtpValue(String(sentOtp)); // Convert OTP to string before setting
    }
  }, [sentOtp]);

  const handleConfirmOtp = async () => {
    const trip_id_to_send = trip?.id;

    if (!trip_id_to_send || !sentOtp) {
      console.log('Otp Value====>>>', sentOtp);
      console.log('Trip Id Value====>>>', trip_id_to_send);
      Alert.alert('Please enter OTP and ensure trip ID is available.');
      return;
    }

    try {
      const response = await dispatch(
        verifyTripOtp({trip_id: trip_id_to_send, otp: otpValue}),
      ).unwrap();

      console.log('OTP Verified:', response);
      Alert.alert('OTP verified successfully!');

      const verifiedId = response?.trip?.id || trip_id_to_send;
      setVerifiedTripId(verifiedId);
      setKMVisible(true);
      setModalVisible(false);
    } catch (error) {
      console.error('OTP Verification Failed:', error);
      Alert.alert('Invalid OTP. Please try again.');
    }
  };

  const handleYesPress = () => {
    console.log('Here data is being sended to accept api ');
    if (!selectedRide) return;

    const tripDetails = {
      booking_ref_no: selectedRide.booking_ref_no,
      trip_type: selectedRide.trip_type,
      pickup: selectedRide.pickup,
      drop: selectedRide.drop,
      customer_name: selectedRide.customer_name,
      customer_phone: selectedRide.customer_contact_phone,
      customer_email: selectedRide.customer_email,
      customer_address: selectedRide.customer_address,
      pickup_latitude: selectedRide.pickup_latitude,
      pickup_longitude: selectedRide.pickup_longitude,
      drop_latitude: selectedRide.drop_latitude,
      drop_longitude: selectedRide.drop_longitude,
    };

    dispatch(postTrip(tripDetails));
    setAcceptModalVisible(false);
    setMapModalVisible(false);
    // console.log('StartRideView =====>>>>', StartRideView);
    // console.log('StartRideView.id =====>>>>', StartRideView?.id);

    // dispatch(markTripArrived(StartRideView.id)); // put some condition for this line
  };

  const handleAcceptPress = ride => {
    console.log(
      'Here accept button is being pressed so that the confirmation can be done while sending selected ride to be passed for accept api',
    );
    setAcceptModalVisible(true);
    setSelectedRide(ride);
  };

  const handleSubmitKM = async () => {
    console.log('🚩 KM Value:', kmValue);
    console.log('🚩 Verified Trip ID:', verifiedTripId);
    if (!kmValue || !verifiedTripId) {
      console.log('Km====>>>', kmValue);
      console.log('Verify oTP====>>', verifiedTripId);
      Alert.alert('Please enter KM and ensure trip is verified.');
      return;
    }

    try {
      const response = await dispatch(
        startTripKM({id: verifiedTripId, start_km: kmValue}),
      ).unwrap();

      console.log('KM submitted:', response);
      Alert.alert('KM submitted successfully!');
      openMaps({
        pickupLat: response?.trip.pickup_latitude,
        pickupLng: response?.trip.pickup_longitude,
        dropLat: response?.trip.drop_latitude,
        dropLng: response?.trip.drop_longitude,
      });
    } catch (error) {
      console.error('Error submitting KM:', error);
      Alert.alert('Failed to submit KM. Please try again.');
    }
  };
  useEffect(() => {
    console.log(
      'Arrived update modal under useffect====>>>>',
      arrivedUpdateModal,
    );
  }, [arrivedUpdateModal]);

  console.log(
    'startRideView after calledarrived update modal inside it====>>>>',
    StartRideView,
  );

  return (
    <View style={HomeStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{flex: 1}}
        contentContainerStyle={{height: 1500}} // Ensures enough scrollable space
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        style={HomeStyle.map}
        region={{
          latitude: 22.5958,
          longitude: 88.2636,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => console.log('Map is ready')}></MapView>

      <TouchableOpacity
        style={HomeStyle.DrawerButton}
        onPress={() => navigation.openDrawer()}>
        <Image
          source={DrawerImg}
          style={HomeStyle.DrawerImg}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={HomeStyle.OnlineButton}
        onPress={() => setOnlineModalVisible(true)}>
        <View style={HomeStyle.RowOnlineView}>
          {status === 'online' ? (
            <View style={HomeStyle.HomeOnlineBtn}></View>
          ) : null}
          <Text
            style={[
              HomeStyle.buttonText,
              {paddingLeft: responsiveScreenWidth(2), color: '#000'},
            ]}>
            {status === 'online' ? 'You are Online now' : 'You are Offline now'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={HomeStyle.NotificationButton}
        onPress={() => navigation.navigate('Notification')}>
        <Image
          source={Bell}
          style={HomeStyle.BellNotificationImg}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={HomeStyle.earningsContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Total Rides :</Text>
            <Text>{driver_earning?.total_hours ?? 0}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Total Earnings:</Text>
            <Text>{driver_earning?.total_earning ?? 0}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Today Login Hours:</Text>
            <Text>{driver_earning?.today_earning ?? 0}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Wallet Balance:</Text>
            <Text>{driver_earning?.wallet ?? 0}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Monthly Earning:</Text>
            <Text>{driver_earning?.monthly_earning ?? 0}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Avg earnings per hr:</Text>
            <Text>{driver_earning?.monthly_earning ?? 0}</Text>
          </View>
        </View>
      </View>
      <View style={HomeStyle.overViewContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Today</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Earnings:</Text>
            <Text>0</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Hours :</Text>
            <Text>0</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Weekly Earnings:</Text>
            <Text>0</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Weekly Hrs:</Text>
            <Text>0</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Overall Earnings:</Text>
            <Text>0</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Overall Hrs:</Text>
            <Text>0</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={HomeStyle.MapButton} onPress={openModal}>
        <Text style={HomeStyle.buttonText}>Map Modal</Text>
      </TouchableOpacity>

      {/* Online Modal */}
      <Modal visible={onlineModalVisible} transparent animationType="slide">
        <View style={HomeStyle.modalContainer}>
          <View style={[HomeStyle.modalContent, {backgroundColor: '#0C3384'}]}>
            <View style={{alignSelf: 'center'}}>
              <View style={HomeStyle.BasicTickImgView}>
                <Image
                  source={BasicTick}
                  style={HomeStyle.BasicTickImg}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={{alignSelf: 'center'}}>
              <Text
                style={[
                  HomeStyle.subTitle,
                  {textAlign: 'center', width: responsiveScreenWidth(50)},
                ]}>
                Are you certain you want to go online
              </Text>
            </View>

            {/* Close Modal Button */}
            <View style={HomeStyle.CancelYesBtnView}>
              <TouchableOpacity
                style={[
                  HomeStyle.button,
                  {
                    backgroundColor: '#0C3384',
                    // backgroundColor: 'red',
                    width: responsiveScreenWidth(20),
                    borderColor: '#000',
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setOnlineModalVisible(false)}>
                <Text style={HomeStyle.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  HomeStyle.button,
                  {
                    backgroundColor: '#04B725',
                    width: responsiveScreenWidth(20),
                  },
                ]}
                onPress={handleConfirmStatusChange}>
                <Text style={HomeStyle.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Map Modal */}

      <Modal
        transparent
        visible={mapModalVisible}
        animationType="slide"
        // animationType="none"
        onRequestClose={closeModal} // Handles back button on Android
      >
        <View style={HomeStyle.modalContainer}>
          <Animated.View
            style={[
              HomeStyle.MapModalContent,
              {
                transform: [{translateY}],
                height: responsiveScreenHeight(140),
              },
            ]}>
            <View style={{paddingBottom: responsiveScreenHeight(2)}}>
              <TouchableOpacity
                onPress={() => setMapModalVisible(false)}
                style={{
                  height: responsiveScreenHeight(1),
                  width: responsiveScreenWidth(12),
                  backgroundColor: '#0C3384',
                  borderRadius: responsiveScreenWidth(4),
                }}></TouchableOpacity>
            </View>
            {/* <ScrollView> */}
            <View>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2.5),
                  fontWeight: '600',
                  color: '#000',
                  lineHeight: 30,
                  paddingBottom: responsiveScreenHeight(1),
                }}>
                Rides
              </Text>
            </View>

            <View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'grey',
                  borderRadius: responsiveScreenWidth(2),
                  padding: responsiveScreenWidth(3),
                }}>
                {rides?.map(
                  (ride, index) => (
                    console.log('Here data is getting shown for all rides'),
                    (
                      <View
                        key={index}
                        style={{
                          paddingTop: responsiveScreenHeight(1),
                        }}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              borderBottomColor: 'grey',
                              borderBottomWidth: 1,
                              paddingBottom: responsiveScreenHeight(1),
                            }}>
                            <Image
                              source={
                                ride.driver_profile_image
                                  ? {uri: ride.driver_profile_image}
                                  : null // Replace with your actual default image path
                              }
                              style={{
                                height: responsiveScreenHeight(8),
                                width: responsiveScreenHeight(8),
                                borderRadius: responsiveScreenHeight(4), // Optional: Makes it circular
                              }}
                              resizeMode="cover"
                            />
                            {/* </View> */}
                            {/* </View> */}
                            <View
                              style={{paddingLeft: responsiveScreenWidth(3)}}>
                              <Text
                                style={{
                                  fontSize: responsiveScreenFontSize(2),
                                  fontWeight: '700',
                                  color: '#000',
                                  lineHeight: 40,
                                }}>
                                {ride.customer_name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: responsiveScreenFontSize(2),
                                  fontWeight: '500',
                                  color: '#000',
                                  lineHeight: 30,
                                }}>
                                {ride.customer_email}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            paddingTop: responsiveScreenHeight(1),
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            paddingBottom: responsiveScreenHeight(1),
                          }}>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={HomeStyle.step}>
                              <Image
                                source={Compass}
                                style={{
                                  height: responsiveScreenHeight(4),
                                  width: responsiveScreenWidth(7),
                                }}
                                resizeMode="contain"
                              />
                              <Text style={HomeStyle.textSteps}>
                                {ride.pickup}
                              </Text>
                            </View>
                          </View>

                          <View style={{paddingLeft: responsiveScreenWidth(3)}}>
                            <View
                              style={{
                                width: responsiveScreenWidth(1),
                                height: responsiveScreenHeight(4),
                                borderStyle: 'dashed',
                                borderWidth: 1,
                                borderColor: '#0C3384',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}></View>
                          </View>

                          {/* End Location */}
                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <View style={HomeStyle.step}>
                              <Image
                                source={Destination}
                                style={{
                                  height: responsiveScreenHeight(4),
                                  width: responsiveScreenWidth(7),
                                }}
                                resizeMode="contain"
                              />
                              <Text style={HomeStyle.textSteps}>
                                {ride.drop}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: responsiveScreenHeight(2),
                            paddingBottom: responsiveScreenHeight(1),
                          }}>
                          <TouchableOpacity
                            onPress={() => handleAcceptPress(ride)}
                            style={{
                              width: responsiveScreenWidth(90),
                              padding: responsiveScreenHeight(2),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#0C3384',
                              borderRadius: responsiveScreenWidth(4),
                            }}>
                            <Text
                              style={{
                                fontWeight: '700',
                                fontSize: responsiveScreenFontSize(2),
                                lineHeight: 36.14,
                                color: '#fff',
                              }}>
                              Accept
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  ),
                )}
              </View>
              {rides?.map((ride, index) => (
                <View
                  style={{paddingTop: responsiveScreenHeight(1)}}
                  key={index}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'grey',
                      borderRadius: responsiveScreenWidth(2),
                      padding: responsiveScreenWidth(1),
                      width: responsiveScreenWidth(96),
                    }}>
                    <View
                      style={{
                        padding: responsiveScreenHeight(2),
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '600',
                            color: '#000',
                            lineHeight: 40,
                          }}>
                          Start Date:
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '600',
                            color: '#0C3384',
                            lineHeight: 40,
                          }}>
                          {moment(ride.datetime).format(
                            'DD MMM YYYY [at] hh:mmA',
                          )}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '600',
                            color: '#000',
                            lineHeight: 40,
                          }}>
                          Estimated Total Amount:
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '600',
                            color: '#0C3384',
                            lineHeight: 40,
                          }}>
                          {ride.base_fare}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '600',
                            color: '#000',
                            lineHeight: 40,
                          }}>
                          Payment Mode:
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '600',
                            color: '#0C3384',
                            lineHeight: 40,
                          }}>
                          {ride.payment_type}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '600',
                            color: '#000',
                            lineHeight: 40,
                          }}>
                          Booking Type:
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '600',
                            color: '#0C3384',
                            lineHeight: 40,
                          }}>
                          {ride.trip_type}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            {/* </ScrollView> */}
          </Animated.View>
        </View>
        <Modal visible={acceptModalVisible} transparent animationType="fade">
          <View style={HomeStyle.AcceptModalContainer}>
            <View style={HomeStyle.AcceptModalContent}>
              {/* Top Blue Section */}
              <View style={HomeStyle.AcceptBlueSection}>
                <View
                  style={{
                    height: responsiveScreenHeight(8),
                    width: responsiveScreenHeight(8),
                    borderRadius: responsiveScreenHeight(4),
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Tick}
                    style={{
                      height: responsiveScreenHeight(8),
                      width: responsiveScreenWidth(12),
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* White Section with Text and Buttons */}
              <View style={HomeStyle.AcceptWhiteSection}>
                <Text style={HomeStyle.AcceptModalText}>
                  You will not receive new riders and notifications
                </Text>
                <View style={HomeStyle.AcceptButtonContainer}>
                  <TouchableOpacity
                    style={HomeStyle.AcceptNoButton}
                    onPress={() => setAcceptModalVisible(false)}>
                    <Image
                      source={Cross}
                      style={{
                        height: responsiveScreenHeight(4),
                        width: responsiveScreenWidth(6),
                      }}
                      resizeMode="contain"
                    />
                    <Text style={HomeStyle.AcceptNoText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={HomeStyle.AcceptYesButton}
                    onPress={handleYesPress}>
                    <Image
                      source={BasicTick}
                      style={{
                        height: responsiveScreenHeight(4),
                        width: responsiveScreenWidth(6),
                        tintColor: '#fff',
                      }}
                      resizeMode="contain"
                    />
                    <Text style={HomeStyle.AcceptYesText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Modal>

      {/* Map Tracking  Modal */}
      <Modal
        transparent
        visible={tripStartModal}
        animationType="slide"
        // animationType="none"
        // onRequestClose={closeModal} // Handles back button on Android
      >
        <View style={HomeStyle.modalContainer}>
          <Animated.View
            style={[HomeStyle.MapModalContent, {transform: [{translateY}]}]}>
            <TouchableOpacity
              onPress={() => setTripStartModal(false)}
              style={{
                height: responsiveScreenHeight(1),
                width: responsiveScreenWidth(12),
                backgroundColor: '#0C3384',
                borderRadius: responsiveScreenWidth(4),
              }}></TouchableOpacity>
            {rideDetailsArray?.map((ride, index) => (
              // console.log('Ride before passing====>>>', ride),
              <View
                style={{
                  paddingTop: responsiveScreenHeight(4),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(8),
                        width: responsiveScreenHeight(8),
                        borderRadius: responsiveScreenHeight(4),
                        borderWidth: 6,
                        borderColor: 'yellow',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(7),
                          width: responsiveScreenHeight(7),
                          borderRadius: responsiveScreenHeight(3.5),
                          borderWidth: 4,
                          borderColor: 'blue',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(3),
                            fontWeight: '600',
                            color: 'blue',
                            lineHeight: 40,
                          }}>
                          Bt
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: responsiveScreenFontSize(2),
                          fontWeight: '700',
                          color: '#000',
                          lineHeight: 40,
                        }}>
                        {ride.customer_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: responsiveScreenFontSize(2),
                          fontWeight: '500',
                          color: '#000',
                          lineHeight: 30,
                        }}>
                        {ride.customer_email}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View>
                      <View
                        style={{
                          height: responsiveScreenHeight(4),
                          width: responsiveScreenHeight(6),
                          borderRadius: responsiveScreenHeight(1),
                          borderWidth: 1,
                          borderColor: 'blue',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '700',
                            color: '#000',
                            lineHeight: 20,
                          }}>
                          SOS
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingLeft: responsiveScreenWidth(2),
                        paddingRight: responsiveScreenWidth(2),
                      }}>
                      <TouchableOpacity>
                        <View
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenHeight(6),
                            borderRadius: responsiveScreenHeight(1),
                            borderWidth: 1,
                            borderColor: 'blue',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={PhoneCall}
                            style={{
                              height: responsiveScreenHeight(5),
                              width: responsiveScreenWidth(3),
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity>
                        <View
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenHeight(6),
                            borderRadius: responsiveScreenHeight(1),
                            borderWidth: 1,
                            borderColor: 'blue',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={SMSIcon}
                            style={{
                              height: responsiveScreenHeight(4),
                              width: responsiveScreenWidth(7),
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{paddingTop: responsiveScreenHeight(3)}}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={HomeStyle.step}>
                      <Image
                        source={Compass}
                        style={{
                          height: responsiveScreenHeight(4),
                          width: responsiveScreenWidth(7),
                        }}
                        resizeMode="contain"
                      />
                      <Text style={HomeStyle.textSteps}>{ride.pickup}</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{
                          height: responsiveScreenHeight(4),
                          width: responsiveScreenHeight(4),
                          borderRadius: responsiveScreenHeight(1),
                          borderWidth: 1,
                          borderColor: 'black',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={Destination}
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenWidth(7),
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{paddingLeft: responsiveScreenWidth(3)}}>
                    <View
                      style={{
                        width: responsiveScreenWidth(1),
                        height: responsiveScreenHeight(4),
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        borderColor: '#0C3384',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></View>
                  </View>

                  {/* End Location */}
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={HomeStyle.step}>
                      <Image
                        source={Destination}
                        style={{
                          height: responsiveScreenHeight(4),
                          width: responsiveScreenWidth(7),
                        }}
                        resizeMode="contain"
                      />
                      <Text style={HomeStyle.textSteps}>{ride.drop}</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{
                          height: responsiveScreenHeight(4),
                          width: responsiveScreenHeight(4),
                          borderRadius: responsiveScreenHeight(1),
                          borderWidth: 1,
                          borderColor: 'black',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={Destination}
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenWidth(7),
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    paddingTop: responsiveScreenHeight(3),
                  }}>
                  <TouchableOpacity>
                    <Image
                      source={MapsCenter}
                      style={{
                        height: responsiveScreenHeight(4),
                        width: responsiveScreenWidth(7),
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: responsiveScreenHeight(6),
                    paddingBottom: responsiveScreenHeight(10),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('isArrived:', isArrived);
                      console.log('ride:', ride);
                      if (!isArrived) {
                        setArrivedLocationModal(true);
                      } else {
                        setArrivedUpdateModal(prev => {
                          if (!prev) return ride; // Only update if it’s not already set
                          return prev;
                        });
                      }
                    }}
                    style={{
                      width: responsiveScreenWidth(90),
                      padding: responsiveScreenHeight(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#0C3384',
                      borderRadius: responsiveScreenWidth(4),
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: responsiveScreenFontSize(2),
                        lineHeight: 36.14,
                        color: '#fff',
                      }}>
                      {isArrived ? 'Arrived' : 'Arriving'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Animated.View>
        </View>

        <Modal visible={arrivedLocationModal} transparent animationType="slide">
          <View style={HomeStyle.modalContainer}>
            <View
              style={[HomeStyle.modalContent, {backgroundColor: '#0C3384'}]}>
              <View style={{alignSelf: 'center'}}>
                <View
                  style={{
                    height: responsiveScreenHeight(8),
                    width: responsiveScreenHeight(8),
                    borderRadius: responsiveScreenHeight(4),
                    justifyContent: 'center',
                    alignItems: 'center',

                    backgroundColor: '#396ACFFC',
                  }}>
                  <Image
                    source={BasicTick}
                    style={{
                      height: responsiveScreenHeight(4),
                      width: responsiveScreenWidth(8),
                      tintColor: '#fff',
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={{alignSelf: 'center'}}>
                <Text
                  style={[
                    HomeStyle.subTitle,
                    {textAlign: 'center', width: responsiveScreenWidth(50)},
                  ]}>
                  Are you sure that you are on way to the of pick up location
                </Text>
              </View>

              {/* Close Modal Button */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={[
                    HomeStyle.button,
                    {
                      backgroundColor: '#0C3384',
                      // backgroundColor: 'red',
                      width: responsiveScreenWidth(20),
                      borderColor: '#000',
                      borderWidth: 1,
                    },
                  ]}
                  onPress={() => setOnlineModalVisible(false)}>
                  <Text style={HomeStyle.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    HomeStyle.button,
                    {
                      backgroundColor: '#04B725',
                      width: responsiveScreenWidth(20),
                    },
                  ]}
                  onPress={() => {
                    setIsArrived(true);
                    // Update to "Arrived"
                    setArrivedLocationModal(false);
                    // Close this modal
                  }}>
                  <Text style={HomeStyle.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal visible={!!arrivedUpdateModal} transparent animationType="slide">
          <View style={HomeStyle.modalContainer}>
            <View
              style={[HomeStyle.modalContent, {backgroundColor: '#0C3384'}]}>
              <View style={{alignSelf: 'center'}}>
                <View
                  style={{
                    height: responsiveScreenHeight(8),
                    width: responsiveScreenHeight(8),
                    borderRadius: responsiveScreenHeight(4),
                    justifyContent: 'center',
                    alignItems: 'center',

                    backgroundColor: '#396ACFFC',
                  }}>
                  <Image
                    source={BasicTick}
                    style={{
                      height: responsiveScreenHeight(4),
                      width: responsiveScreenWidth(8),
                      tintColor: '#fff',
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={{alignSelf: 'center'}}>
                <Text
                  style={[
                    HomeStyle.subTitle,
                    {textAlign: 'center', width: responsiveScreenWidth(50)},
                  ]}>
                  Are you sure that you want to start ride
                </Text>
              </View>

              {/* Close Modal Button */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={[
                    HomeStyle.button,
                    {
                      backgroundColor: '#0C3384',
                      // backgroundColor: 'red',
                      width: responsiveScreenWidth(20),
                      borderColor: '#000',
                      borderWidth: 1,
                    },
                  ]}
                  onPress={() => setOnlineModalVisible(false)}>
                  <Text style={HomeStyle.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    HomeStyle.button,
                    {
                      backgroundColor: '#04B725',
                      width: responsiveScreenWidth(20),
                    },
                  ]}
                  onPress={() => {
                    setStartRideView(arrivedUpdateModal); // Pass ride data
                    console.log(
                      'Please console startrideview====>>>',
                      StartRideView,
                    );

                    // setArrivedUpdateModal(null);
                    setTimeout(() => {
                      setStartRideModal(true); // Open modal after state updates
                    }, 100);
                  }}>
                  <Text style={HomeStyle.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Modal
            transparent
            visible={startRideModal}
            animationType="slide"
            // animationType="none"
            // onRequestClose={closeModal} // Handles back button on Android
          >
            {/* {console.log('SelectedRide=====>>>>', selectedRide)} */}
            <View style={HomeStyle.modalContainer}>
              <Animated.View
                style={[
                  HomeStyle.MapModalContent,
                  {transform: [{translateY}]},
                ]}>
                <TouchableOpacity
                  onPress={() => setTripStartModal(false)}
                  style={{
                    height: responsiveScreenHeight(1),
                    width: responsiveScreenWidth(12),
                    backgroundColor: '#0C3384',
                    borderRadius: responsiveScreenWidth(4),
                  }}></TouchableOpacity>
                {StartRideView && (
                  <View
                    style={{
                      paddingTop: responsiveScreenHeight(4),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            height: responsiveScreenHeight(8),
                            width: responsiveScreenHeight(8),
                            borderRadius: responsiveScreenHeight(4),
                            borderWidth: 6,
                            borderColor: 'yellow',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              height: responsiveScreenHeight(7),
                              width: responsiveScreenHeight(7),
                              borderRadius: responsiveScreenHeight(3.5),
                              borderWidth: 4,
                              borderColor: 'blue',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: responsiveScreenFontSize(3),
                                fontWeight: '600',
                                color: 'blue',
                                lineHeight: 40,
                              }}>
                              Bt
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(2),
                              fontWeight: '700',
                              color: '#000',
                              lineHeight: 40,
                            }}>
                            {StartRideView.customer_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(2),
                              fontWeight: '500',
                              color: '#000',
                              lineHeight: 30,
                            }}>
                            {StartRideView.customer_email}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View>
                          <View
                            style={{
                              height: responsiveScreenHeight(4),
                              width: responsiveScreenHeight(6),
                              borderRadius: responsiveScreenHeight(1),
                              borderWidth: 1,
                              borderColor: 'blue',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: responsiveScreenFontSize(2),
                                fontWeight: '700',
                                color: '#000',
                                lineHeight: 20,
                              }}>
                              SOS
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            paddingLeft: responsiveScreenWidth(2),
                            paddingRight: responsiveScreenWidth(2),
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(
                                `tel:${StartRideView.customer_phone}`,
                              )
                            }>
                            <View
                              style={{
                                height: responsiveScreenHeight(4),
                                width: responsiveScreenHeight(6),
                                borderRadius: responsiveScreenHeight(1),
                                borderWidth: 1,
                                borderColor: 'blue',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={PhoneCall}
                                style={{
                                  height: responsiveScreenHeight(5),
                                  width: responsiveScreenWidth(3),
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(
                                `sms:${StartRideView.customer_phone}`,
                              )
                            }>
                            <View
                              style={{
                                height: responsiveScreenHeight(4),
                                width: responsiveScreenHeight(6),
                                borderRadius: responsiveScreenHeight(1),
                                borderWidth: 1,
                                borderColor: 'blue',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={SMSIcon}
                                style={{
                                  height: responsiveScreenHeight(4),
                                  width: responsiveScreenWidth(7),
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={{paddingTop: responsiveScreenHeight(3)}}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View style={HomeStyle.step}>
                          <Image
                            source={Compass}
                            style={{
                              height: responsiveScreenHeight(4),
                              width: responsiveScreenWidth(7),
                            }}
                            resizeMode="contain"
                          />
                          <Text style={HomeStyle.textSteps}>
                            {StartRideView.pickup}
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={{
                              height: responsiveScreenHeight(4),
                              width: responsiveScreenHeight(4),
                              borderRadius: responsiveScreenHeight(1),
                              borderWidth: 1,
                              borderColor: 'black',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={Destination}
                              style={{
                                height: responsiveScreenHeight(4),
                                width: responsiveScreenWidth(7),
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={{paddingLeft: responsiveScreenWidth(3)}}>
                        <View
                          style={{
                            width: responsiveScreenWidth(1),
                            height: responsiveScreenHeight(4),
                            borderStyle: 'dashed',
                            borderWidth: 1,
                            borderColor: '#0C3384',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}></View>
                      </View>

                      {/* End Location */}
                      <View
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View style={HomeStyle.step}>
                          <Image
                            source={Destination}
                            style={{
                              height: responsiveScreenHeight(4),
                              width: responsiveScreenWidth(7),
                            }}
                            resizeMode="contain"
                          />
                          <Text style={HomeStyle.textSteps}>
                            {StartRideView.drop}
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={{
                              height: responsiveScreenHeight(4),
                              width: responsiveScreenHeight(4),
                              borderRadius: responsiveScreenHeight(1),
                              borderWidth: 1,
                              borderColor: 'black',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={Destination}
                              style={{
                                height: responsiveScreenHeight(4),
                                width: responsiveScreenWidth(7),
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        paddingTop: responsiveScreenHeight(3),
                      }}>
                      <TouchableOpacity>
                        <Image
                          source={MapsCenter}
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenWidth(7),
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: responsiveScreenHeight(6),
                        paddingBottom: responsiveScreenHeight(10),
                      }}>
                      <TouchableOpacity
                        onPress={handleStartRideTrip}
                        style={{
                          width: responsiveScreenWidth(90),
                          padding: responsiveScreenHeight(2),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#0C3384',
                          borderRadius: responsiveScreenWidth(4),
                        }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 36.14,
                            color: '#fff',
                          }}>
                          Start Ride
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Animated.View>
            </View>
            <Modal visible={modalVisible} transparent animationType="slide">
              <View style={HomeStyle.modalContainer}>
                <View style={HomeStyle.modalContent}>
                  <Text style={HomeStyle.title}>Enter OTP</Text>
                  <Text style={HomeStyle.subTitle}>
                    Enter the otp display in customers mobile to start the ride{' '}
                  </Text>

                  {/* OTP Input inside Modal */}

                  <View>
                    <CodeField
                      ref={ref}
                      {...props}
                      value={otpValue}
                      onChangeText={text => setOtpValue(String(text))}
                      cellCount={CELL_COUNT}
                      rootStyle={HomeStyle.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({index, symbol, isFocused}) => (
                        <View
                          key={index}
                          style={[
                            HomeStyle.cell,
                            isFocused && HomeStyle.focusCell,
                          ]}
                          onLayout={getCellOnLayoutHandler(index)}>
                          <Text style={HomeStyle.cellText}>
                            {symbol || ' '}
                          </Text>
                        </View>
                      )}
                    />

                    {/* Close Modal Button */}
                    <TouchableOpacity
                      style={HomeStyle.button}
                      onPress={handleConfirmOtp}>
                      <Text style={HomeStyle.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal visible={kmVisible} transparent animationType="slide">
              <TouchableWithoutFeedback onPress={() => setKMVisible(false)}>
                <View style={HomeStyle.modalContainer}>
                  <View style={HomeStyle.modalContent}>
                    <Text style={HomeStyle.title}>Enter Km</Text>
                    <TextInput
                      label="Starting Km"
                      mode="outlined"
                      keyboardType="numeric"
                      value={kmValue}
                      onChangeText={setKmValue}
                      style={HomeStyle.input}
                    />
                    <TouchableOpacity
                      onPress={handleSubmitKM}
                      style={[
                        HomeStyle.button,
                        {
                          alignSelf: 'center',
                          width: responsiveScreenWidth(70),
                        },
                      ]}>
                      <Text style={HomeStyle.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </Modal>
        </Modal>
      </Modal>
    </View>
  );
};

export default Home;
