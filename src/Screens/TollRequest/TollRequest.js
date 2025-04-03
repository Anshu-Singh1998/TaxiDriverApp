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
import {useState, useEffect} from 'react';
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
import {tollRequestList, tollRequestUpdate} from '../../redux/Slices/TollSlice';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';


const TollRequest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {status, loading} = useSelector(state => state.toll);
  const tollData = useSelector(state => state.toll.data);
  console.log('tolldata====>>>', tollData);
  useEffect(() => {
    dispatch(tollRequestList());
  }, []);

 
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
            <Image
              source={Left}
              resizeMode="contain"
              style={TollRequestStyle.backIcon}
            />
          </TouchableOpacity>
          <Text style={TollRequestStyle.headerTitle}>Toll Request</Text>
        </View>
        <ScrollView>
          <View style={TollRequestStyle.SpacingValue}>
            <View>
              <FlatList
                data={tollData}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  
                  console.log('Toll Item====>>>', item),
                  (
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
                                <Text style={TollRequestStyle.DateText}>
                                {moment(item.created_at).format('DD MMM YYYY [at] hh:mm A')}
                                </Text>
                              </View>
                             
                            </View>
                            <View>
                              <View>
                                <Text style={TollRequestStyle.RideId}>
                                  Ride Id {item.ride_id}
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
                                value={item.toll_amount}
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
                            <TouchableOpacity
                              style={TollRequestStyle.RequestBtn}>
                              <Text style={TollRequestStyle.RequestBtnText}>
                                Request
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  )
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
