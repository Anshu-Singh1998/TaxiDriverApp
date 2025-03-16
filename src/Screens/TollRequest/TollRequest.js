import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  TollRequestStyleheet,
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
import {useNavigation} from '@react-navigation/native';
import TollRequestStyle from './TollRequestStyle';

const TollRequest = () => {
  const navigation = useNavigation();
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
    <View style={TollRequestStyle.MainContainer}>
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#0C3384"
          animated={true}
        />
        <View style={TollRequestStyle.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Left} resizeMode="contain" style={TollRequestStyle.backIcon} />
          </TouchableOpacity>
          <Text style={TollRequestStyle.headerTitle}>Toll Request</Text>
        </View>
        <ScrollView>
          <View style={TollRequestStyle.SpacingValue}>
            <View>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <View style={{paddingBottom: responsiveScreenHeight(1)}}>
                    <View style={TollRequestStyle.ListRowView}>
                      <View style={TollRequestStyle.BorderLine}>
                        <View style={TollRequestStyle.RowViewSpace}>
                          <View style={TollRequestStyle.CalenderImgRow}>
                            <View>
                              <Image
                                source={Calender}
                                style={TollRequestStyle.CalenderImg}
                                resizeMode="contain"
                              />
                            </View>

                            <View>
                              <Text style={TollRequestStyle.DateText}>{item.date}</Text>
                            </View>
                            <View style={TollRequestStyle.AtSpaceView}>
                              <Text style={TollRequestStyle.AtText}>at</Text>
                            </View>
                            <View>
                              <Text style={TollRequestStyle.TimeText}>{item.time}</Text>
                            </View>
                          </View>
                          <View>
                            <View>
                              <Text style={TollRequestStyle.RideId}>
                                Ride Id {item.rideId}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={TollRequestStyle.StepView}>
                          <View style={TollRequestStyle.step}>
                            <Image
                              source={Compass}
                              style={TollRequestStyle.CompassIcon}
                              resizeMode="contain"
                            />
                            <Text style={TollRequestStyle.textSteps}>
                              {item.startPoint}
                            </Text>
                          </View>
                          <View style={TollRequestStyle.lineView}>
                            <View style={TollRequestStyle.line}></View>
                          </View>

                          {/* End Location */}
                          <View style={TollRequestStyle.step}>
                            <Image
                              source={Destination}
                              style={TollRequestStyle.DestinationImg}
                              resizeMode="contain"
                            />
                            <Text style={TollRequestStyle.textSteps}>
                              {item.endPoint}
                            </Text>
                          </View>
                        </View>
                        <View style={TollRequestStyle.InputCamera}>
                          <View>
                            <TextInput
                              placeholder="Enter Amount"
                              style={TollRequestStyle.AmountInput}
                            />
                          </View>
                          <View style={TollRequestStyle.CameraImgIconView}>
                            <Image
                              source={item.cameraImg}
                              style={TollRequestStyle.CameraImgIcon}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                        <View style={TollRequestStyle.RequestBtnView}>
                          <TouchableOpacity style={TollRequestStyle.RequestBtn}>
                            <Text style={TollRequestStyle.RequestBtnText}>Request</Text>
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

export default TollRequest;
