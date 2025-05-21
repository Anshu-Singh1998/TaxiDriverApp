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
  AppState,
  ToastAndroid,
  ImageBackground,
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
import ZigzagCircle from '../../../Assets/ZigzagCircle.png';
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
import {startTripKM, endTripKM} from '../../redux/Slices/KilometerSlice';
import {
  fetchDriverEarnings,
  fetchDriverHours,
} from '../../redux/Slices/DriverEarningSlice';
import {
  fetchOngoingTrips,
  fetchCancelledTrips,
  fetchCompletedTrips,
  markTripArrived,
} from '../../redux/Slices/ridesSlice';
import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {isSearchBarAvailableForCurrentPlatform} from 'react-native-screens';

const CELL_COUNT = 6; // Number of OTP boxes

const formatLoginTime = timeStr => {
  if (!timeStr) return '00:00:00';

  const minsMatch = timeStr.match(/(\d+)\s*mins?/);
  const secsMatch = timeStr.match(/(\d+)\s*secs?/);

  const mins = minsMatch ? parseInt(minsMatch[1]) : 0;
  const secs = secsMatch ? parseInt(secsMatch[1]) : 0;

  const totalSecs = mins * 60 + secs;

  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  const pad = n => (n < 10 ? '0' + n : n);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const Home = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [kmVisible, setKMVisible] = useState(false);
  const [endKmVisible, setEndKMVisible] = useState(false);
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [onlineModalVisible, setOnlineModalVisible] = useState(false);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [cancelTripModal, setCancelTripModal] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [completeTripOtpValue, setCompleteTripOtpValue] = useState('');
  const [
    completeTripOtpVerificationTripId,
    setCompleteTripOtpVerificationTripId,
  ] = useState('');
  const [cancelTripId, setCancelTripId] = useState('');
  const [completeTripId, setCompleteTripId] = useState('');
  const [otpConfirmedId, setOtpConfirmedId] = useState('');
  const [location, setLocation] = useState(null);
  const [tripStartModal, setTripStartModal] = useState(false);
  const [completeTripOtpModal, setCompleteTripOtpModal] = useState(false);
  const [arrivedLocationModal, setArrivedLocationModal] = useState(false);
  const [paymentAmountModal, setPaymentAmountModal] = useState(false);
  const [arrivedUpdateModal, setArrivedUpdateModal] = useState(null);
  const [isArrived, setIsArrived] = useState(false);
  const [startRideModal, setStartRideModal] = useState(false);
  const [completeTripResponse, setCompleteTripResponse] = useState(null); // store the response
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [rideDetails, setRideDetails] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [StartRideView, setStartRideView] = useState(null);
  const [tripId, setTripId] = useState(null);
  const [reason, setReason] = useState('');
  const rideDetailsArray = [rideDetails];
  const [verifiedTripId, setVerifiedTripId] = useState(null);
  const [kmValue, setKmValue] = useState('');
  const [endKmValue, setEndKmValue] = useState('');
  const lastScrollY = useRef(0);
  const appState = useRef(AppState.currentState);
  const [showCompleteTripModal, setShowCompleteTripModal] = useState(false);
  const dispatch = useDispatch();
  const {status, loading} = useSelector(state => state.status);
  const rides = useSelector(state => state.driver.data);
  const tripScheduled = useSelector(state => state.trips);
  const {trip, sentOtp} = useSelector(state => state.otp);

  const km = useSelector(state => state.kilometer);
  const driver_earning = useSelector(state => state.driverEarning.driverearned);
  const driver_hours = useSelector(state => state.driverEarning.driverhours);

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

  const completeTripRef = useBlurOnFulfill({
    value: completeTripOtpValue,
    cellCount: CELL_COUNT,
  });
  const [completeTripProps, getCompleteTripCellOnLayoutHandler] =
    useClearByFocusCell({
      value: completeTripOtpValue,
      setValue: setCompleteTripOtpValue,
    });

  const translateY = new Animated.Value(300);

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
      setRideDetails(route.params.rideDetails);
    }
  }, [route.params]);

  const openMaps = ({pickupLat, pickupLng, dropLat, dropLng}) => {
    if (!pickupLat || !pickupLng || !dropLat || !dropLng) {
      return;
    }

    let url = '';

    if (Platform.OS === 'ios') {
      // Apple Maps - use directions from source to destination
      url = `http://maps.apple.com/?saddr=${pickupLat},${pickupLng}&daddr=${dropLat},${dropLng}&dirflg=d`;
    } else {
      // Google Maps - directly start navigation with action=navigate
      url = `google.navigation:q=${dropLat},${dropLng}&mode=d`;
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
      return;
    }

    const trip_id = StartRideView?.id;

    if (!trip_id) {
      return;
    }

    try {
      // ✅ Don't rely on setTripId here
      const arrivedResponse = await dispatch(markTripArrived(trip_id)).unwrap();

      // Send OTP request
      const otpResponse = await dispatch(sendOtp(trip_id)).unwrap();

      if (otpResponse) {
        const otpString = String(otpResponse); // Convert number to string
        setOtpValue(otpString);
        setModalVisible(true);
      } else {
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

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');

        // After returning from Maps
        setShowCompleteTripModal(true);

        // Show small toast or alert
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Welcome back! Please complete your trip.',
            ToastAndroid.SHORT,
          );
        } else {
          Alert.alert('Welcome back!', 'Please complete your trip.');
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleConfirmOtp = async () => {
    const trip_id_to_send = trip?.id;

    if (!trip_id_to_send || !sentOtp) {
      Alert.alert('Please enter OTP and ensure trip ID is available.');
      return;
    }

    try {
      const response = await dispatch(
        verifyTripOtp({trip_id: trip_id_to_send, otp: otpValue}),
      ).unwrap();

      Alert.alert('OTP verified successfully!');

      const verifiedId = response?.trip?.id || trip_id_to_send;
      setVerifiedTripId(verifiedId);
      setKMVisible(true);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Invalid OTP. Please try again.');
    }
  };

  const handleYesPress = () => {
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
  };

  const handleNoPress = async () => {
    if (!selectedRide) return;

    setCancelTripId(selectedRide.id);
    setAcceptModalVisible(false);

    try {
      const resultAction = await dispatch(
        fetchCancelledTrips({
          trip_id: selectedRide.id,
          cancel_type: 'Cancelled by Driver',
          cancel_reason: reason, // make sure 'reason' is already filled
        }),
      );

      if (fetchCancelledTrips.fulfilled.match(resultAction)) {
        setCancelTripModal(false);
        setReason('');
      } else {
      }
    } catch (error) {}
  };

  const handleAcceptPress = ride => {
    setAcceptModalVisible(true);
    setSelectedRide(ride);
  };

  useEffect(() => {}, [arrivedUpdateModal]);

  const handleSubmitKM = async () => {
    if (!kmValue || !verifiedTripId) {
      return;
    }

    try {
      const response = await dispatch(
        startTripKM({id: verifiedTripId, start_km: kmValue}),
      ).unwrap();

      // Alert.alert('KM submitted successfully!');
      setCompleteTripId(response?.trip.id);
      openMaps({
        pickupLat: response?.trip.pickup_latitude,
        pickupLng: response?.trip.pickup_longitude,
        dropLat: response?.trip.drop_latitude,
        dropLng: response?.trip.drop_longitude,
      });
    } catch (error) {
      Alert.alert('Failed to submit KM. Please try again.');
    }
  };


 


  const handleSubmitEndKM = async () => {
    console.log('Being clicked');
    if (!endKmValue || !completeTripResponse?.trip.id) {
      console.log('End km value====>>>', endKmValue);
      console.log(
        'trip if for complete trip===>>>',
        completeTripResponse?.trip.id,
      );
      return;
    }

    try {
      const response = await dispatch(
        endTripKM({id: completeTripResponse?.trip.id, end_km: endKmValue}),
      ).unwrap();

      console.log('Response of End KKm data=====>>>>>>', response);
    } catch (error) {
      Alert.alert('Failed to submit KM. Please try again.');
    }
  };

  const handleCompleteTrip = async () => {
    try {
      const resultAction = await dispatch(
        fetchCompletedTrips({trip_id: completeTripId}),
      );

      if (fetchCompletedTrips.fulfilled.match(resultAction)) {
        console.log('Trip Completed Successfully!', resultAction.payload);

        setCompleteTripResponse(resultAction.payload); // store API response

        setCompleteTripOtpValue(String(resultAction.payload.otp));
        console.log("Otp Value for final verification after completing trip====>>>",completeTripOtpValue)
        setCompleteTripOtpVerificationTripId(resultAction.payload.trip.id);
        setShowCompleteTripModal(false);
        setShowResponseModal(true);
        // hide the old complete trip modal
        // show new response modal
      } else {
        console.log('Trip completion failed', resultAction.payload);
        // Optionally handle failure
      }
    } catch (error) {}
  };

  const handleConfirmCompleteOtp = async () => {
    const trip_id_to_send = completeTripOtpVerificationTripId;
    // console.log("Trip Id for complete confirm trip id=====>>>",trip_id_to_send)
    // console.log("Otp Value for final verification====>>>",completeTripOtpValue)

    if (!trip_id_to_send || !completeTripOtpValue) {
      Alert.alert('Please enter OTP and ensure trip ID is available.');
      console.log("Trip Id for complete confirm trip id=====>>>",trip_id_to_send)
      console.log("Otp Value for final verification====>>>",completeTripOtpValue)
      return;
    }

    try {
      console.log(" inside try Trip Id for complete confirm trip id=====>>>",trip_id_to_send)
      console.log(" inside try Otp Value for final verification====>>>",completeTripOtpValue)
      const response = await dispatch(
        verifyTripOtp({trip_id: trip_id_to_send, otp: completeTripOtpValue}),
      ).unwrap();

      Alert.alert('OTP verified successfully!');
      setOtpConfirmedId(response?.trip.id);
      // const verifiedOtpId = response?.trip?.id || trip_id_to_send;
    } catch (error) {
      console.error('OTP Verification Failed:', error.message);
      Alert.alert('Invalid OTP. Please try again.');
    }
  };
  console.log(
    'Otp Verified , response confirm trip id=====>>>>',
    otpConfirmedId,
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
        <View style={HomeStyle.RowKeyValueView}>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Total Rides :</Text>
            <Text style={HomeStyle.ValueText}>
              {driver_earning?.total_hours ?? 0}
            </Text>
          </View>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Total Earnings:</Text>
            <Text style={HomeStyle.ValueText}>
              {driver_earning?.total_earning ?? 0}
            </Text>
          </View>
        </View>
        <View style={HomeStyle.RowKeyValueView}>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Today Login Hours:</Text>
            <Text style={HomeStyle.ValueText}>
              {driver_earning?.today_earning ?? 0}
            </Text>
          </View>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Wallet Balance:</Text>
            <Text style={HomeStyle.ValueText}>
              {driver_earning?.wallet ?? 0}
            </Text>
          </View>
        </View>
        <View style={HomeStyle.RowKeyValueView}>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Monthly Earning:</Text>
            <Text style={HomeStyle.ValueText}>
              {driver_earning?.monthly_earning ?? 0}
            </Text>
          </View>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Avg earnings per hr:</Text>
            <Text style={HomeStyle.ValueText}>
              {driver_earning?.monthly_earning ?? 0}
            </Text>
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
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Earnings:</Text>
            <Text style={HomeStyle.ValueText}>
              {formatLoginTime(driver_hours?.total_login_time_today)}
            </Text>
          </View>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Hours :</Text>
            <Text style={HomeStyle.ValueText}>
              {formatLoginTime(driver_hours?.total_login_time_today)}
            </Text>
          </View>
        </View>
        <View style={HomeStyle.RowKeyValueView}>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Weekly Earnings:</Text>
            <Text style={HomeStyle.ValueText}>
              {formatLoginTime(driver_hours?.total_login_time_today)}
            </Text>
          </View>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Weekly Hrs:</Text>
            <Text style={HomeStyle.ValueText}>
              {formatLoginTime(driver_hours?.total_login_time_today)}
            </Text>
          </View>
        </View>
        <View style={HomeStyle.RowKeyValueView}>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Overall Earnings:</Text>
            <Text style={HomeStyle.ValueText}>
              {formatLoginTime(driver_hours?.total_login_time_today)}
            </Text>
          </View>
          <View style={HomeStyle.RowKeyValue}>
            <Text style={HomeStyle.KeyText}>Overall Hrs:</Text>
            <Text style={HomeStyle.ValueText}>
              {formatLoginTime(driver_hours?.total_login_time_today)}
            </Text>
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
                {rides?.map((ride, index) => (
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
                        <View style={{paddingLeft: responsiveScreenWidth(3)}}>
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
                          <Text style={HomeStyle.textSteps}>{ride.pickup}</Text>
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
                ))}
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
                    onPress={() => setCancelTripModal(true)}>
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

      <Modal visible={cancelTripModal} transparent animationType="slide">
        <View style={HomeStyle.modalContainer}>
          <View style={[HomeStyle.modalContent, {backgroundColor: '#0C3384'}]}>
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
                Are you sure you want to cancel this trip ?
              </Text>
            </View>

            <View style={{alignSelf: 'center'}}>
              <TextInput
                placeholder="Enter reason for your cancellation"
                placeholderTextColor="#000"
                value={reason}
                onChangeText={setReason}
                style={{
                  width: responsiveScreenWidth(70),
                  padding: responsiveScreenHeight(1),
                  borderWidth: 1,
                  borderColor: '#000',
                }}
              />
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
                onPress={() => setCancelTripModal(false)}>
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
                onPress={handleNoPress}>
                <Text style={HomeStyle.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showCompleteTripModal} transparent animationType="slide">
        <View style={HomeStyle.modalContainer}>
          <View style={[HomeStyle.modalContent, {backgroundColor: '#0C3384'}]}>
            <Text style={{fontSize: 18, marginBottom: 10, color: '#000'}}>
              Trip Completed?
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#04B725',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={handleCompleteTrip}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveScreenFontSize(2),
                  fontWeight: '400',
                }}>
                Yes, Complete Trip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() => setShowCompleteTripModal(false)}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: responsiveScreenFontSize(2),
                  fontWeight: '400',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(`tel:${ride.customer_phone}`)
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
                          Linking.openURL(`sms:${ride.customer_phone}`)
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
                {/* <View
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
                </View> */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: responsiveScreenHeight(6),
                    paddingBottom: responsiveScreenHeight(10),
                    marginBottom: responsiveScreenHeight(10),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
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
                  onPress={() => setCancelTripModal(true)}>
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
                  onPress={() => setArrivedUpdateModal(false)}>
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
                    {/* <View
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
                    </View> */}
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
                <View
                  style={[
                    HomeStyle.modalContent,
                    {width: responsiveScreenWidth(95)},
                  ]}>
                  <Text style={[HomeStyle.title, {textAlign: 'center'}]}>
                    Enter OTP
                  </Text>
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
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity
                        style={HomeStyle.button}
                        onPress={handleConfirmOtp}>
                        <Text style={HomeStyle.buttonText}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
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

      {showResponseModal && (
        <Modal
          transparent={true}
          visible={showResponseModal}
          animationType="slide"
          onRequestClose={() => {
            setShowResponseModal(false);
            setCompleteTripOtpModal(true);
            // setEndKMVisible(true);
          }}
          onDismiss={() => {
            setCompleteTripOtpModal(true);

            // setEndKMVisible(true);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowResponseModal(false);
              setCompleteTripOtpModal(true);
              // setEndKMVisible(true);
            }}>
            <View style={HomeStyle.RideBoxView}>
              <View style={{paddingBottom: responsiveScreenHeight(4)}}>
                <View
                  style={[
                    HomeStyle.RideBox,
                    {
                      height: responsiveScreenHeight(90),
                      backgroundColor: '#fff',
                    },
                  ]}>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      S.No :{completeTripResponse?.trip.id}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Customer Name :{completeTripResponse?.trip.customer_name}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Booking Ref No :
                      {completeTripResponse?.trip.booking_ref_no}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Pickup :{completeTripResponse?.trip.pickup}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Drop :{completeTripResponse?.trip.drop}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Pickup Date :
                      {moment(completeTripResponse?.trip.pickup_time).format(
                        'DD-MM-YYYY',
                      )}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Pickup Time :
                      {moment(completeTripResponse?.trip.pickup_time).format(
                        'hh:mm A',
                      )}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Package :{completeTripResponse?.trip.package_type}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      No of persons :{completeTripResponse?.trip.no_of_persons}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Estimate fare and time :
                      {completeTripResponse?.trip.total_rupees}
                      {moment(completeTripResponse?.drop_time).format(
                        'hh:mm A',
                      )}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Car Type :{completeTripResponse?.trip.car_type}
                    </Text>
                  </View>
                  <View>
                    <Text style={HomeStyle.TripTypeText}>
                      Trip Type :{completeTripResponse?.trip.trip_type}
                    </Text>
                  </View>
                  <View style={HomeStyle.ArrivalStatusRow}>
                    <View>
                      <Text style={HomeStyle.ArrivalStatusText}>
                        Arrival Status :
                      </Text>
                    </View>
                    <View style={HomeStyle.ArrivalStatusRowView}>
                      <View style={HomeStyle.FinishedView}>
                        <View style={HomeStyle.FinishedTextView}>
                          <Text style={HomeStyle.FinishedText}>
                            {completeTripResponse?.trip.status}
                          </Text>
                        </View>
                        <View style={HomeStyle.FinishTripView}>
                          <View style={HomeStyle.FinishTripTextView}>
                            <Text style={HomeStyle.FinishTripText}>
                              Finish Trip
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={HomeStyle.TollMoneyView}>
                        <View style={HomeStyle.TollMoneyTextView}>
                          <Text style={HomeStyle.TollMoneyText}>
                            Toll money
                          </Text>
                        </View>
                        <View style={HomeStyle.PrintBillView}>
                          <View style={HomeStyle.PrintBillTextView}>
                            <Text style={HomeStyle.PrintBillText}>
                              Print Bill
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {completeTripOtpModal && (
        <Modal
          visible={completeTripOtpModal}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setEndKMVisible(true);
          }}
          onDismiss={() => {
            setEndKMVisible(true);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCompleteTripOtpModal(false);
              setEndKMVisible(true);
            }}>
            <View style={HomeStyle.modalContainer}>
              <View
                style={[
                  HomeStyle.modalContent,
                  {width: responsiveScreenWidth(95)},
                ]}>
                <Text style={[HomeStyle.title, {textAlign: 'center'}]}>
                  Enter OTP
                </Text>
                <Text style={HomeStyle.subTitle}>
                  Enter the otp display in customers mobile to start the ride{' '}
                </Text>

                {/* OTP Input inside Modal */}

                <View>
                  <CodeField
                    ref={completeTripRef}
                    {...completeTripProps}
                    value={completeTripOtpValue}
                    onChangeText={text => setCompleteTripOtpValue(String(text))}
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
                        onLayout={getCompleteTripCellOnLayoutHandler(index)}>
                        <Text style={HomeStyle.cellText}>{symbol || ' '}</Text>
                      </View>
                    )}
                  />

                  {/* Close Modal Button */}
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={HomeStyle.button}
                      onPress={handleConfirmCompleteOtp}>
                      <Text style={HomeStyle.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {endKmVisible && (
        <Modal
          visible={endKmVisible}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setPaymentAmountModal(true);
          }}
          onDismiss={() => {
            setPaymentAmountModal(true);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setEndKMVisible(false);
              setPaymentAmountModal(true);
            }}>
            <View style={HomeStyle.modalContainer}>
              <View style={HomeStyle.modalContent}>
                <Text style={HomeStyle.title}>Enter Km</Text>
                <TextInput
                  label="Ending Km"
                  mode="outlined"
                  keyboardType="numeric"
                  value={endKmValue}
                  onChangeText={setEndKmValue}
                  style={HomeStyle.input}
                />
                <TouchableOpacity
                  onPress={handleSubmitEndKM}
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
      )}

      <Modal visible={paymentAmountModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setPaymentAmountModal(false)}>
          <View style={HomeStyle.modalContainer}>
            <View style={HomeStyle.modalContent}>
              <ImageBackground source={ZigzagCircle}></ImageBackground>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Home;
