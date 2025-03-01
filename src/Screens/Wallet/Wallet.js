import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const Wallet = ({navigation}) => {
  const data = [
    {
      id: '1',
      debit: 'Money Debit',
      amount: '- Rs 10.00',
      commission: 'Admin Role Commission ',
      date: '20 Dec 2024',
      time: '11:02 AM',
    },
    {
      id: '2',
      debit: 'Money Debit',
      amount: '- Rs 0.00',
      commission: 'Admin Role Commission ',
      date: '16 Dec 2024',
      time: '05:59 PM',
    },
    {
      id: '',
      debit: 'Money Debit',
      amount: '- Rs 5.00',
      commission: 'Admin Role Commission ',
      date: '15 Dec 2024',
      time: '03:05 PM',
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
              Wallet
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: responsiveScreenHeight(4),
          }}>
          <View
            style={{
              padding: responsiveScreenHeight(3),
              backgroundColor: '#0C3384',
              justifyContent: 'center',
              alignItems: 'center',
              width: responsiveScreenWidth(60),
              borderRadius: responsiveScreenWidth(4),
            }}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: responsiveScreenFontSize(2),
                lineHeight: 36,
                color: '#fff',
              }}>
              Available Balance
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: responsiveScreenFontSize(2),
                lineHeight: 36,
                color: '#fff',
              }}>
              Rs. -659.00{' '}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingLeft: responsiveScreenWidth(5),
            paddingRight: responsiveScreenWidth(5),
            paddingTop: responsiveScreenHeight(3),
          }}>
          <View>
            <Text
              style={{
                fontWeight: '700',
                fontSize: responsiveScreenFontSize(2),
                lineHeight: 40,
                color: 'grey',
              }}>
              Recent Transactions
            </Text>
          </View>
          <View>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <View style={{paddingBottom: responsiveScreenHeight(2)}}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'grey',
                      width: responsiveScreenWidth(90),
                      borderRadius: responsiveScreenWidth(2),
                      padding: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: responsiveScreenWidth(10),
                          height: responsiveScreenHeight(4),
                          backgroundColor: 'grey',
                          borderRadius: responsiveScreenWidth(2),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: responsiveScreenFontSize(3),
                            lineHeight: 40,
                            color: '#0C3384',
                          }}>
                          -
                        </Text>
                      </View>
                      <View style={{paddingTop: responsiveScreenHeight(4)}}>
                        <View>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: responsiveScreenFontSize(2),
                              lineHeight: 20,
                              color: '#000',
                            }}>
                            {item.debit}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: responsiveScreenFontSize(2),
                              lineHeight: 20,
                              color: '#000',
                            }}>
                            {item.commission}
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
                            {item.date} at {item.time}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: responsiveScreenFontSize(2),
                            lineHeight: 40,
                            color: '#000',
                          }}>
                          {item.amount}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: responsiveScreenHeight(3),
          }}>
          <TouchableOpacity
          onPress={()=>navigation.navigate('TollRequest')}
            style={{
              backgroundColor: '#ebd1ff',
              width: responsiveScreenWidth(90),
              padding: responsiveScreenWidth(1),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: responsiveScreenWidth(6),
            }}>
            <Text
              style={{
                color: '#3b22e0',
                fontSize: responsiveScreenFontSize(2),
                fontWeight: '500',
                lineHeight: 20,
              }}>
              Add Toll Request
            </Text>
          </TouchableOpacity>
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
});
export default Wallet;
