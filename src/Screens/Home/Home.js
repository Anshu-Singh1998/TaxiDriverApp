import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  StatusBar,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
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

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        style={styles.map}
        region={{
          latitude: 22.5958,
          longitude: 88.2636,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => console.log('Map is ready')}></MapView>

      <TouchableOpacity
        style={styles.DrawerButton}
        onPress={() => navigation.openDrawer()}>
        <Image
          source={DrawerImg}
          style={{
            height: responsiveScreenHeight(6),
            width: responsiveScreenWidth(8),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.OnlineButton}
        onPress={() => setOnlineModalVisible(true)}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: responsiveScreenHeight(2),
              height: responsiveScreenHeight(2),
              borderRadius: responsiveScreenHeight(1),
              backgroundColor: 'green',
              alignItems: 'center',
            }}></View>
          <Text
            style={[
              styles.buttonText,
              {paddingLeft: responsiveScreenWidth(2), color: '#000'},
            ]}>
            You are Online now
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.NotificationButton}
        onPress={() => navigation.navigate('Notification')}>
        <Image
          source={Bell}
          style={{
            height: responsiveScreenHeight(6),
            width: responsiveScreenWidth(8),
            tintColor: 'Blue',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* Button to Open OTP Modal */}
      <TouchableOpacity
        style={styles.OtpButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Enter OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.KMButton}
        onPress={() => setKMVisible(true)}>
        <Text style={styles.buttonText}>Enter KM</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.MapButton} onPress={openModal}>
        <Text style={styles.buttonText}>Map Modal</Text>
      </TouchableOpacity>

      {/* OTP Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subTitle}>
              Enter the otp display in customers mobile to start the ride{' '}
            </Text>

            {/* OTP Input inside Modal */}
            <CodeField
              ref={ref}
              {...props}
              value={otpValue}
              onChangeText={setOtpValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  <Text style={styles.cellText}>{symbol || ' '}</Text>
                </View>
              )}
            />

            {/* Close Modal Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* KiloMeter Modal */}
      <Modal visible={kmVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Enter Km</Text>
            <TextInput
              label="Starting Km"
              mode="outlined"
              value={text}
              onChangeText={text => setText(text)}
              style={styles.input}
            />
            <TouchableOpacity
              style={[
                styles.button,
                {alignSelf: 'center', width: responsiveScreenWidth(70)},
              ]}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Online Modal */}
      <Modal visible={onlineModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, {backgroundColor: '#0C3384'}]}>
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
                  styles.subTitle,
                  {textAlign: 'center', width: responsiveScreenWidth(50)},
                ]}>
                Are you certain you want to go online
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
                  styles.button,
                  {
                    backgroundColor: '#0C3384',
                    // backgroundColor: 'red',
                    width: responsiveScreenWidth(20),
                    borderColor: '#000',
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setOnlineModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: '#04B725',
                    width: responsiveScreenWidth(20),
                  },
                ]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Yes</Text>
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
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.MapModalContent,
              {transform: [{translateY}], height: responsiveScreenHeight(120)},
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
                    <View style={styles.step}>
                      <Image
                        source={Compass}
                        style={{
                          height: responsiveScreenHeight(4),
                          width: responsiveScreenWidth(7),
                        }}
                        resizeMode="contain"
                      />
                      <Text style={styles.textSteps}>
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
                    <View style={styles.step}>
                      <Image
                        source={Destination}
                        style={{
                          height: responsiveScreenHeight(4),
                          width: responsiveScreenWidth(7),
                        }}
                        resizeMode="contain"
                      />
                      <Text style={styles.textSteps}>
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
          <View style={styles.AcceptModalContainer}>
            <View style={styles.AcceptModalContent}>
              {/* Top Blue Section */}
              <View style={styles.AcceptBlueSection}>
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
              <View style={styles.AcceptWhiteSection}>
                <Text style={styles.AcceptModalText}>
                  You will not receive new riders and notifications
                </Text>
                <View style={styles.AcceptButtonContainer}>
                  <TouchableOpacity
                    style={styles.AcceptNoButton}
                    onPress={() => setAcceptModalVisible(false)}>
                    <Image
                      source={Cross}
                      style={{
                        height: responsiveScreenHeight(4),
                        width: responsiveScreenWidth(6),
                      }}
                      resizeMode="contain"
                    />
                    <Text style={styles.AcceptNoText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.AcceptYesButton}
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
                    <Text style={styles.AcceptYesText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  input: {
    width: responsiveScreenWidth(70),
    padding: responsiveScreenHeight(2),
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(2),

    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DrawerButton: {
    // backgroundColor:"red",
    width: responsiveScreenWidth(20),
    padding: responsiveScreenHeight(2),
    position: 'absolute',
    top: responsiveScreenHeight(1),
    left: responsiveScreenWidth(-2),
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NotificationButton: {
    // backgroundColor:"red",
    width: responsiveScreenWidth(20),
    padding: responsiveScreenHeight(2),
    position: 'absolute',
    top: responsiveScreenHeight(1),
    right: responsiveScreenWidth(-2),
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MapButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#007AFF',
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(2),

    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  KMButton: {
    position: 'absolute',
    left: 10,
    right: 20,
    backgroundColor: '#007AFF',
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(2),

    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  KMButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#007AFF',
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(2),

    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  OnlineButton: {
    position: 'absolute',
    left: 80,
    top: 35,
    backgroundColor: '#fff',
    width: responsiveScreenWidth(50),
    padding: responsiveScreenHeight(1),
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: responsiveScreenWidth(2),
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  OtpButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    backgroundColor: '#007AFF',
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(2),

    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',
  },
  title: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  subTitle: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: '200',
    marginBottom: 15,
    color: 'grey',
  },
  codeFieldRoot: {
    marginBottom: 20,
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    textAlign: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderColor: '#007AFF',
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  MapModalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  MapCloseButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  MapCloseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  MapModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: responsiveScreenHeight(4),
    borderTopRightRadius: responsiveScreenHeight(4),
    alignItems: 'center',
    height: responsiveScreenHeight(80),
  },
  MapHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textSteps: {
    fontSize: 14,
    color: '#333',
  },
  line: {
    marginLeft: 9, // Align with icons
  },
  dash: {
    width: responsiveScreenWidth(1), // Vertical Line
    height: 100, // Adjust height
    flexDirection: 'column', // For vertical alignment
  },
  map: {
    // flex: 1,
    height: '100%',
    width: '100%',
  },
  AcceptModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  AcceptModalContent: {
    width: '80%',
    height: '30%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  AcceptBlueSection: {
    flex: 1,
    backgroundColor: '#0C3384',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AcceptWhiteSection: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  AcceptModalText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  AcceptButtonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  AcceptNoButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0C3384',
    flexDirection: 'row',
    alignItems: 'center',
  },
  AcceptYesButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#0C3384',
    flexDirection: 'row',
    alignItems: 'center',
  },
  AcceptNoText: {
    color: '#0C3384',
    fontWeight: '600',
    paddingLeft: responsiveScreenWidth(1),
  },
  AcceptYesText: {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: responsiveScreenWidth(1),
  },
});
