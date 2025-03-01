import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Calender from '../../../Assets/Calender.png';
import Compass from '../../../Assets/Compass.png';
import Destination from '../../../Assets/Destination.png';
import { useNavigation } from '@react-navigation/native';

const TollRequest = () => {
  const navigation = useNavigation()
  const data = [
    {
      id: '1',
      cameraImg: require('../../../Assets/CameraImg.png'),
      date: '20 Dec 2024',
      time: '11:02 AM',
      startPoint: 'Tirrupur,Tamil Nadu, India',
      endPoint: 'Salem,Tamil Nadu,India',
      rideId: '#433',
    },
    {
      id: '2',
      startPoint: 'Tirrupur,Tamil Nadu, India',
      endPoint: 'Salem,Tamil Nadu,India',
      rideId: '#432',
      date: '16 Dec 2024',
      time: '05:59 PM',
      cameraImg: require('../../../Assets/CameraImg.png'),
    },
    {
      id: '3',
      cameraImg: require('../../../Assets/CameraImg.png'),
      date: '15 Dec 2024',
      time: '03:05 PM',
      startPoint: 'Tirrupur,Tamil Nadu, India',
      endPoint: 'Salem,Tamil Nadu,India',
      rideId: '#431',
    },
  ];
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
          <Text style={styles.headerTitle}>Toll Request</Text>
        </View>
        <ScrollView>
          <View
            style={{
              paddingLeft: responsiveScreenWidth(5),
              paddingRight: responsiveScreenWidth(5),
              paddingTop: responsiveScreenHeight(1),
              paddingBottom: responsiveScreenHeight(15),
            }}>
            <View>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <View style={{paddingBottom: responsiveScreenHeight(1)}}>
                    <View
                      style={{
                        paddingTop: responsiveScreenHeight(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: 'grey',
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
                                {item.date}
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
                                {item.time}
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
                                Ride Id {item.rideId}
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
                              {item.startPoint}
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
                            <Text style={styles.textSteps}>
                              {item.endPoint}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View>
                            <TextInput
                              placeholder="Enter Amount"
                              style={{
                                borderWidth: 1,
                                borderColor: 'grey',
                                width: responsiveScreenWidth(60),
                                color: '#000',
                                borderRadius: responsiveScreenWidth(1),
                                fontSize: responsiveScreenFontSize(2),
                                padding: responsiveScreenWidth(6),
                              }}
                            />
                          </View>
                          <View
                            style={{
                              width: responsiveScreenWidth(20),
                              height: responsiveScreenWidth(20),
                              borderRadius: responsiveScreenWidth(10),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'grey',
                            }}>
                            <Image
                              source={item.cameraImg}
                              style={{
                                width: responsiveScreenWidth(10),
                                height: responsiveScreenWidth(10),
                              }}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: responsiveScreenHeight(2),
                          }}>
                          <TouchableOpacity
                            style={{
                              width: responsiveScreenWidth(80),
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
                              Request
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
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
export default TollRequest;
