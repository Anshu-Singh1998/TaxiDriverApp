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
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const Rides = () => {
  const [selected, setSelected] = useState('Completed');
  const translateX = new Animated.Value(selected === 'Completed' ? 0 : 1);
  const navigation= useNavigation()

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
          barStyle="light-content"
          backgroundColor="#0C3384"
          animated={true}
        />
        <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={Left} resizeMode="contain" style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>About Us</Text>
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
              onPress={() => toggleSwitch('Completed')}>
              <Text
                style={[
                  styles.text,
                  selected === 'Completed' && styles.selectedText,
                ]}>
                Completed
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
            }}>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                S.No : 1
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Customer Name : Divya
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Booking Ref No : 2345
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Pickup : Tiruppur
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Drop : VSA Nagar
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Pickup Date : 30/12/2024
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Pickup Time : 1:00
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Package : 200/-
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                No of persons : 2
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Estimate fare and time :
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Car Type : non /AC
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 36,
                  color: '#000',
                }}>
                Trip Type : Regular Travel
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: responsiveScreenFontSize(2),
                    lineHeight: 36,
                    color: '#000',
                  }}>
                  Arrival Status :
                </Text>
              </View>
              <View style={{paddingTop: responsiveScreenHeight(4)}}>
                <View
                  style={{
                    flexDirection: 'row',

                    paddingBottom: responsiveScreenHeight(2),
                  }}>
                  <View
                    style={{
                      width: responsiveScreenWidth(25),
                      height: responsiveScreenHeight(4),
                      borderRadius: responsiveScreenWidth(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: '#04B725',
                      backgroundColor: '#5894f5',
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: responsiveScreenFontSize(2),
                        lineHeight: 36,
                        color: '#fff',
                      }}>
                      Finished
                    </Text>
                  </View>
                  <View style={{right: -10}}>
                    <View
                      style={{
                        width: responsiveScreenWidth(25),
                        height: responsiveScreenHeight(4),
                        borderRadius: responsiveScreenWidth(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: '#FF0000',
                        backgroundColor: '#3242ab',
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: responsiveScreenFontSize(2),
                          lineHeight: 36,
                          color: '#fff',
                        }}>
                        Finish Trip
                      </Text>
                    </View>
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
                      width: responsiveScreenWidth(25),
                      height: responsiveScreenHeight(4),
                      borderRadius: responsiveScreenWidth(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#cca3f7',
                      // backgroundColor: '#FF0000',
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: responsiveScreenFontSize(2),
                        lineHeight: 36,
                        color: '#fff',
                      }}>
                      Toll money
                    </Text>
                  </View>
                  <View style={{right: -10}}>
                    <View
                      style={{
                        width: responsiveScreenWidth(25),
                        height: responsiveScreenHeight(4),
                        borderRadius: responsiveScreenWidth(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: '#04B725',
                        backgroundColor: '#a95bfc',
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: responsiveScreenFontSize(2),
                          lineHeight: 36,
                          color: '#fff',
                        }}>
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
    color: '#0A2C7D',
  },
  selectedText: {
    color: '#fff',
  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#0C3384',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(4),
  },
  backIcon: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(12),
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(3),
    lineHeight: 40,
    color: '#FFF',
    marginLeft: responsiveScreenWidth(5),
  },
});
export default Rides;
