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
  Linking,
  TouchableWithoutFeedback,
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

const CELL_COUNT = 4; // Number of OTP boxes

const Home = ({navigation}) => {
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
  const [arrivedUpdateModal, setArrivedUpdateModal] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const [startRideModal, setStartRideModal] = useState(false);
  const lastScrollY = useRef(0);
  const route = useRoute();
  const dispatch = useDispatch();
  const {status, loading} = useSelector(state => state.status);
  console.log('Current Driver Status:', status);

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

  const handleYes = () => {
    setMapModalVisible(false);
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          return true;
        } else {
          console.log('Location permission denied');
          Alert.alert(
            'Permission Denied',
            'Please enable location permissions in settings.',
          );
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getUserLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 6000,
    })
      .then(location => {
        console.log(location);
        setLocation(location);
      })
      .catch(error => {
        Alert.alert('Error', error.message);
        console.warn(error);
      });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (route.params?.openModal) {
      console.log('Modal Response', route.params?.openModal);
      setTripStartModal(true);
    }
  }, [route.params]);

  const openMaps = () => {
    const destinationLat = 28.7041; // Replace with actual latitude
    const destinationLng = 77.1025; // Replace with actual longitude
    const destinationName = 'Connaught Place, New Delhi'; // Replace with dynamic location name

    let url = '';

    if (Platform.OS === 'ios') {
      // Apple Maps URL format
      url = `http://maps.apple.com/?daddr=${destinationLat},${destinationLng}&dirflg=d&q=${encodeURIComponent(
        destinationName,
      )}`;
    } else {
      // Google Maps URL format with search query and navigation start
      url = `google.navigation:q=${destinationLat},${destinationLng}&mode=d`;
    }

    // Open the Maps app
    Linking.openURL(url).catch(err =>
      console.error('Failed to open Maps', err),
    );
    setKMVisible(false);
  };

  const handleConfirmStatusChange = () => {
    const newStatus = status === 'offline' ? 'online' : 'offline';
    dispatch(changeDriverStatus(newStatus)).then(() => {
      setOnlineModalVisible(false); // close modal after API call
    });
  };

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
                height: responsiveScreenHeight(120),
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
                OutStation Ride
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: responsiveScreenWidth(2),
                padding: responsiveScreenWidth(3),
              }}>
              <View
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
                        KANNAN RAJ
                      </Text>
                      <Text
                        style={{
                          fontSize: responsiveScreenFontSize(2),
                          fontWeight: '500',
                          color: '#000',
                          lineHeight: 30,
                        }}>
                        kannan@123
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
                        Tiruppur, Tamil Nadu, India
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
                        Salem, Tamil Nadu, India
                      </Text>
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
                    paddingTop: responsiveScreenHeight(2),
                    paddingBottom: responsiveScreenHeight(1),
                  }}>
                  <TouchableOpacity
                    onPress={() => setAcceptModalVisible(true)}
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
            </View>
            <View style={{paddingTop: responsiveScreenHeight(1)}}>
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      20 Dec 2024 at 01:59PM
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      2892.99
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      Cash
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      Advance
                    </Text>
                  </View>
                </View>
              </View>
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
                    onPress={handleYes}>
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
                      KANNAN RAJ
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveScreenFontSize(2),
                        fontWeight: '500',
                        color: '#000',
                        lineHeight: 30,
                      }}>
                      kannan@123
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
                  </View>
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
                      <Image
                        source={SMSIcon}
                        style={{
                          height: responsiveScreenHeight(4),
                          width: responsiveScreenWidth(7),
                        }}
                        resizeMode="contain"
                      />
                    </View>
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
                      Tiruppur, Tamil Nadu, India
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
                      Salem, Tamil Nadu, India
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
                  onPress={() => {
                    if (!isArrived) {
                      setArrivedLocationModal(true);
                    } else {
                      setArrivedUpdateModal(true);
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

            <TouchableOpacity
              style={HomeStyle.MapCloseButton}
              onPress={closeModal}>
              <Text style={HomeStyle.MapCloseButtonText}>Close</Text>
            </TouchableOpacity>
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
                    setIsArrived(true); // Update to "Arrived"
                    setArrivedLocationModal(false);
                    // Close this modal
                  }}>
                  <Text style={HomeStyle.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={arrivedUpdateModal} transparent animationType="slide">
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
                    setStartRideModal(true);
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
                          KANNAN RAJ
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: '500',
                            color: '#000',
                            lineHeight: 30,
                          }}>
                          kannan@123
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
                      </View>
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
                          <Image
                            source={SMSIcon}
                            style={{
                              height: responsiveScreenHeight(4),
                              width: responsiveScreenWidth(7),
                            }}
                            resizeMode="contain"
                          />
                        </View>
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
                          Tiruppur, Tamil Nadu, India
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
                          Salem, Tamil Nadu, India
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
                      onPress={() => {
                        setModalVisible(true);
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
                        Start Ride
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
                  <CodeField
                    ref={ref}
                    {...props}
                    value={otpValue}
                    onChangeText={setOtpValue}
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
                        <Text style={HomeStyle.cellText}>{symbol || ' '}</Text>
                      </View>
                    )}
                  />

                  {/* Close Modal Button */}
                  <TouchableOpacity
                    style={HomeStyle.button}
                    onPress={() => {
                      setKMVisible(true);
                    }}>
                    <Text style={HomeStyle.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Modal visible={kmVisible} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={() => setKMVisible(false)}>
                  <View style={HomeStyle.modalContainer}>
                    <View style={HomeStyle.modalContent}>
                      <Text style={HomeStyle.title}>Enter Km</Text>
                      <TextInput
                        label="Starting Km"
                        mode="outlined"
                        value={text}
                        onChangeText={text => setText(text)}
                        style={HomeStyle.input}
                      />
                      <TouchableOpacity
                        onPress={openMaps}
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
      </Modal>
    </View>
  );
};

export default Home;
