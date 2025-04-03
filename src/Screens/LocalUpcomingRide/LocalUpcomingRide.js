import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import LocalUpcomingRideStyle from './LocalUpcomingRideStyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  localComplete,
  localCancelled,
  localUpcoming,
} from '../../redux/Slices/LocalRideSlice';
import moment from 'moment';

const LocalUpcomingRide = () => {
  const [selected, setSelected] = useState('Upcoming');
  const translateX = new Animated.Value(selected === 'Upcoming' ? 0 : 1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {completed, cancelled, upcoming, loading, error} = useSelector(
    state => state.local,
  );

  const toggleSwitch = value => {
    setSelected(value);
    Animated.timing(translateX, {
      toValue: value === 'Upcoming' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    dispatch(localComplete());
    dispatch(localCancelled());
    dispatch(localUpcoming());
  }, [dispatch]);

  const renderContent = () => {
    switch (selected) {
      case 'Upcoming':
        return (
          <View style={LocalUpcomingRideStyle.RideBoxView}>
            <FlatList
              data={upcoming}
              keyExtractor={item => item.id.toString()} // Ensure key is unique
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={LocalUpcomingRideStyle.RideInfoViewMain}>
                  <View style={LocalUpcomingRideStyle.RideInfoView}>
                    <View style={LocalUpcomingRideStyle.BottomBorder}>
                      <View style={LocalUpcomingRideStyle.DateTimeRow}>
                        <View>
                          <Image
                            source={Calender}
                            style={LocalUpcomingRideStyle.CalenderImg}
                            resizeMode="contain"
                          />
                        </View>

                        <View>
                          <Text style={LocalUpcomingRideStyle.CalenderDateText}>
                            {moment(item.datetime).format('DD-MM-YYYY')}
                          </Text>
                        </View>
                        <View style={LocalUpcomingRideStyle.CalenderAtTextView}>
                          <Text style={LocalUpcomingRideStyle.CalenderAtText}>
                            at
                          </Text>
                        </View>
                        <View>
                          <Text style={LocalUpcomingRideStyle.CalenderTimeText}>
                            {moment(item.datetime).format('hh:mm A')}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View>
                          <Text style={LocalUpcomingRideStyle.RideId}>
                            Ride Id {item.id}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={LocalUpcomingRideStyle.CompassView}>
                      <View style={LocalUpcomingRideStyle.step}>
                        <Image
                          source={Compass}
                          style={LocalUpcomingRideStyle.CompassText}
                          resizeMode="contain"
                        />
                        <Text style={LocalUpcomingRideStyle.textSteps}>
                          {item.start_address}
                        </Text>
                      </View>
                      <View style={LocalUpcomingRideStyle.lineView}>
                        <View style={LocalUpcomingRideStyle.line}></View>
                      </View>

                      {/* End Location */}
                      <View style={LocalUpcomingRideStyle.step}>
                        <Image
                          source={Destination}
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenWidth(7),
                          }}
                          resizeMode="contain"
                        />
                        <Text style={LocalUpcomingRideStyle.textSteps}>
                          {item.end_address}
                        </Text>
                      </View>
                    </View>
                    <View style={LocalUpcomingRideStyle.StartBtnView}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Home', {
                            openModal: true,
                            rideDetails: item,
                          })
                        }
                        style={LocalUpcomingRideStyle.StartBtn}>
                        <Text style={LocalUpcomingRideStyle.StartBtnText}>
                          Start
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        );
      case 'Completed':
        return (
          <>
            <View style={LocalUpcomingRideStyle.RideBoxView}>
              <FlatList
                data={completed}
                keyExtractor={item => item.id.toString()} // Ensure key is unique
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <View style={{paddingBottom: responsiveScreenHeight(4)}}>
                    <View style={LocalUpcomingRideStyle.RideBox} key={index}>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          S.No :{item.id}
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Customer Name :{item.customer_name}
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Booking Ref No :{item.booking_ref_no}
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Pickup :{item.pickup}
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Drop :{item.drop}
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Pickup Date :
                          {moment(item.pickup_time).format('DD-MM-YYYY')}
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Pickup Time :
                          {moment(item.pickup_time).format('hh:mm A')}
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Package :{item.package_type}
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          No of persons :
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Estimate fare and time : {item.total_rupees}{' '}
                          {moment(item.drop_time).format('hh:mm A')}
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Car Type :
                        </Text>
                      </View>
                      <View>
                        <Text style={LocalUpcomingRideStyle.TripTypeText}>
                          Trip Type :{item.trip_type}
                        </Text>
                      </View>
                      <View style={LocalUpcomingRideStyle.ArrivalStatusRow}>
                        <View>
                          <Text
                            style={LocalUpcomingRideStyle.ArrivalStatusText}>
                            Arrival Status :
                          </Text>
                        </View>
                        <View
                          style={LocalUpcomingRideStyle.ArrivalStatusRowView}>
                          <View style={LocalUpcomingRideStyle.FinishedView}>
                            <View
                              style={LocalUpcomingRideStyle.FinishedTextView}>
                              <Text style={LocalUpcomingRideStyle.FinishedText}>
                                {item.status}
                              </Text>
                            </View>
                            <View style={LocalUpcomingRideStyle.FinishTripView}>
                              <View
                                style={
                                  LocalUpcomingRideStyle.FinishTripTextView
                                }>
                                <Text
                                  style={LocalUpcomingRideStyle.FinishTripText}>
                                  Finish Trip
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={LocalUpcomingRideStyle.TollMoneyView}>
                            <View
                              style={LocalUpcomingRideStyle.TollMoneyTextView}>
                              <Text
                                style={LocalUpcomingRideStyle.TollMoneyText}>
                                Toll money
                              </Text>
                            </View>
                            <View style={LocalUpcomingRideStyle.PrintBillView}>
                              <View
                                style={
                                  LocalUpcomingRideStyle.PrintBillTextView
                                }>
                                <Text
                                  style={LocalUpcomingRideStyle.PrintBillText}>
                                  Print Bill
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </>
        );
      case 'Cancelled':
        return (
          <View style={LocalUpcomingRideStyle.RideBoxView}>
            <FlatList
              data={cancelled}
              keyExtractor={item => item.id.toString()} // Ensure key is unique
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={{paddingBottom: responsiveScreenHeight(8)}}>
                  <View style={LocalUpcomingRideStyle.RideBox} key={index}>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        S.No :{item.id}
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Customer Name :{item.customer_name}
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Booking Ref No :{item.booking_ref_no}
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Pickup :{item.pickup}
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Drop :{item.drop}
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Pickup Date :
                        {moment(item.pickup_time).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Pickup Time :
                        {moment(item.pickup_time).format('hh:mm A')}
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Package :{item.package_type}
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        No of persons :
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Estimate fare and time : {item.total_rupees}{' '}
                        {moment(item.drop_time).format('hh:mm A')}
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Car Type :
                      </Text>
                    </View>
                    <View>
                      <Text style={LocalUpcomingRideStyle.TripTypeText}>
                        Trip Type :{item.trip_type}
                      </Text>
                    </View>
                    <View style={LocalUpcomingRideStyle.ArrivalStatusRow}>
                      <View>
                        <Text style={LocalUpcomingRideStyle.ArrivalStatusText}>
                          Arrival Status :
                        </Text>
                      </View>
                      <View style={LocalUpcomingRideStyle.ArrivalStatusRowView}>
                        <View style={LocalUpcomingRideStyle.FinishedView}>
                          <View style={LocalUpcomingRideStyle.FinishedTextView}>
                            <Text style={LocalUpcomingRideStyle.FinishedText}>
                              {item.status}
                            </Text>
                          </View>
                          <View style={LocalUpcomingRideStyle.FinishTripView}>
                            <View
                              style={LocalUpcomingRideStyle.FinishTripTextView}>
                              <Text
                                style={LocalUpcomingRideStyle.FinishTripText}>
                                Finish Trip
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={LocalUpcomingRideStyle.TollMoneyView}>
                          <View
                            style={LocalUpcomingRideStyle.TollMoneyTextView}>
                            <Text style={LocalUpcomingRideStyle.TollMoneyText}>
                              Toll money
                            </Text>
                          </View>
                          <View style={LocalUpcomingRideStyle.PrintBillView}>
                            <View
                              style={LocalUpcomingRideStyle.PrintBillTextView}>
                              <Text
                                style={LocalUpcomingRideStyle.PrintBillText}>
                                Print Bill
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={LocalUpcomingRideStyle.MainContainerView}>
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          animated={true}
        />
        <View style={LocalUpcomingRideStyle.header}>
          <View style={LocalUpcomingRideStyle.LeftView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Left}
                resizeMode="contain"
                style={LocalUpcomingRideStyle.LeftImg}
              />
            </TouchableOpacity>
          </View>
          <View style={LocalUpcomingRideStyle.OutStationUpcomingRideTextView}>
            <Text style={LocalUpcomingRideStyle.OutStationUpcomingRideText}>
              Local Upcoming Rides
            </Text>
          </View>
        </View>
        <View style={LocalUpcomingRideStyle.ToggleArea}>
          <View style={LocalUpcomingRideStyle.switchContainer}>
            <Animated.View
              style={[
                LocalUpcomingRideStyle.slider,
                {
                  left: translateX.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: ['0%', '33.3%', '66.6%'],
                  }),
                },
              ]}
            />
            <TouchableOpacity
              style={LocalUpcomingRideStyle.option}
              onPress={() => toggleSwitch('Upcoming')}>
              <Text
                style={[
                  LocalUpcomingRideStyle.text,
                  selected === 'Upcoming' &&
                    LocalUpcomingRideStyle.selectedText,
                ]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={LocalUpcomingRideStyle.option}
              onPress={() => toggleSwitch('Completed')}>
              <Text
                style={[
                  LocalUpcomingRideStyle.text,
                  selected === 'Completed' &&
                    LocalUpcomingRideStyle.selectedText,
                ]}>
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={LocalUpcomingRideStyle.option}
              onPress={() => toggleSwitch('Cancelled')}>
              <Text
                style={[
                  LocalUpcomingRideStyle.text,
                  selected === 'Cancelled' &&
                    LocalUpcomingRideStyle.selectedText,
                ]}>
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>{renderContent()}</View>
      </View>
    </View>
  );
};

export default LocalUpcomingRide;
