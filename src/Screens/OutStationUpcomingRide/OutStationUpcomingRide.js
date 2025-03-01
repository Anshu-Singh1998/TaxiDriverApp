import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import Calender from '../../../Assets/Calender.png';
import Compass from '../../../Assets/Compass.png';
import Destination from '../../../Assets/Destination.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, {Line} from 'react-native-svg';

const OutStationUpcomingRide = () => {
  const [selected, setSelected] = useState('Completed');
  const translateX = new Animated.Value(selected === 'Completed' ? 0 : 1);

  const toggleSwitch = value => {
    setSelected(value);
    Animated.timing(translateX, {
      toValue: value === 'Completed' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          animated={true}
        />
        <View
          style={{
            height: 80,
            width: '100%',
            backgroundColor: '#0C3384',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              paddingLeft: responsiveScreenWidth(4),
              paddingTop: responsiveScreenHeight(1),
            }}>
            <Image
              source={Left}
              resizeMode="contain"
              style={{
                height: responsiveScreenHeight(6),
                width: responsiveScreenWidth(12),
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              paddingLeft: responsiveScreenWidth(4),
              paddingTop: responsiveScreenHeight(1),
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: responsiveScreenFontSize(3),
                lineHeight: 40,
                color: '#FFF',
              }}>
              OutStation Upcoming Rides
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: responsiveScreenHeight(2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.switchContainer}>
            <Animated.View
              style={[
                styles.slider,
                {
                  left: translateX.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '50%'],
                  }),
                },
              ]}
            />
            <TouchableOpacity
              style={styles.option}
              onPress={() => toggleSwitch('Upcoming')}>
              <Text
                style={[
                  styles.text,
                  selected === 'Upcoming' && styles.selectedText,
                ]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => toggleSwitch('Cancelled')}>
              <Text
                style={[
                  styles.text,
                  selected === 'Cancelled' && styles.selectedText,
                ]}>
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingTop: responsiveScreenHeight(4),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#000',
              width: responsiveScreenWidth(90),
              padding: responsiveScreenHeight(2),
              borderRadius: responsiveScreenWidth(4),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image
                    source={Calender}
                    style={{
                      height: responsiveScreenHeight(4),
                      width: responsiveScreenWidth(10),
                    }}
                    resizeMode="contain"
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: responsiveScreenFontSize(2),
                      lineHeight: 40,
                      color: '#000',
                    }}>
                    20 Dec 2024
                  </Text>
                </View>
                <View
                  style={{
                    paddingLeft: responsiveScreenWidth(0.5),
                    paddingRight: responsiveScreenWidth(0.5),
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: responsiveScreenFontSize(2),
                      lineHeight: 40,
                      color: '#000',
                    }}>
                    at
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: responsiveScreenFontSize(2),
                      lineHeight: 40,
                      color: '#000',
                    }}>
                    01:59pm
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: responsiveScreenFontSize(2),
                      lineHeight: 40,
                      color: '#000',
                    }}>
                    Ride Id #433
                  </Text>
                </View>
              </View>
            </View>
            <View style={{paddingTop: responsiveScreenHeight(3)}}>
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
              <View style={styles.step}>
                <Image
                  source={Destination}
                  style={{
                    height: responsiveScreenHeight(4),
                    width: responsiveScreenWidth(7),
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.textSteps}>Salem, Tamil Nadu, India</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: responsiveScreenHeight(6),
              }}>
              <TouchableOpacity
                style={{
                  width: responsiveScreenWidth(60),
                  padding: responsiveScreenHeight(2),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#0C3384',
                  borderRadius: responsiveScreenWidth(8),
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: responsiveScreenFontSize(2),
                    lineHeight: 36.14,
                    color: '#fff',
                  }}>
                  Start
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  switchContainer: {
    width: 400,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: '#0A2C7D',
    borderRadius: 25,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedText: {
    color: '#fff',
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
});
export default OutStationUpcomingRide;
