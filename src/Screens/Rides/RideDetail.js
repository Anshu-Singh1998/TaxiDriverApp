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
import RightArrow from '../../../Assets/RightArrow.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Calender from '../../../Assets/Calender.png';
import Compass from '../../../Assets/Compass.png';
import Destination from '../../../Assets/Destination.png';

const RideDetail = () => {
  return (
    <View style={{flex: 1}}>
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#0C3384"
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
              paddingLeft: responsiveScreenWidth(10),
              paddingTop: responsiveScreenHeight(1),
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: responsiveScreenFontSize(4),
                lineHeight: 40,
                color: '#FFF',
              }}>
              Ride Detail
            </Text>
          </View>
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
                    </View>
                    <View style={{paddingLeft: responsiveScreenWidth(2)}}>
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: responsiveScreenFontSize(2),
                              lineHeight: 40,
                              color: '#000',
                            }}>
                            Distance :
                          </Text>
                        </View>

                        <View>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: responsiveScreenFontSize(2),
                              lineHeight: 40,
                              color: '#000',
                              paddingLeft: responsiveScreenWidth(2),
                            }}>
                            239.00 KM
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
                        <View>
                          <Text style={styles.textSteps}>
                            20 Dec 2024 at 11:02 AM
                          </Text>
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
                      <View style={styles.step}>
                        <Image
                          source={Destination}
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenWidth(7),
                          }}
                          resizeMode="contain"
                        />
                        <View>
                          <Text style={styles.textSteps}>
                            20 Dec 2024 at 11:02 AM
                          </Text>
                          <Text style={styles.textSteps}>
                            Salem, Tamil Nadu, India
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: responsiveScreenHeight(2),
                      }}>
                      <View>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 40,
                            color: '#000',
                          }}>
                          View History
                        </Text>
                      </View>
                      <View>
                        <Image
                          source={RightArrow}
                          style={{
                            height: responsiveScreenHeight(2),
                            width: responsiveScreenWidth(5),
                            tintColor: 'grey',
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
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
                    <View style={{}}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: responsiveScreenFontSize(2),
                          lineHeight: 40,
                          color: '#000',
                        }}>
                        Payment Details
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: responsiveScreenHeight(2),
                      }}>
                      <View>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 40,
                            color: '#000',
                          }}>
                          Via
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
                          Cash
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
                        <Text
                          style={{
                            fontWeight: '500',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 40,
                            color: '#000',
                          }}>
                          Status
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 40,
                            color: '#000',
                          }}>
                          Pending
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
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
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                        paddingBottom: responsiveScreenHeight(2),
                      }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: responsiveScreenFontSize(2),
                          lineHeight: 40,
                          color: '#000',
                        }}>
                        Price Details
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
                            lineHeight: 30,
                            color: '#000',
                          }}>
                          Ride Charge
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 30,
                            color: '#000',
                          }}>
                          Rs 0.00
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 30,
                            color: '#000',
                          }}>
                          Additional Charge
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 30,
                            color: '#000',
                          }}>
                          Rs 100.00
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
                        <Text
                          style={{
                            fontWeight: '500',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 40,
                            color: 'green',
                          }}>
                          Total
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 40,
                            color: 'green',
                          }}>
                          Rs 100.00
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
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
                  Cash Collected
                </Text>
              </TouchableOpacity>
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
});
export default RideDetail;
