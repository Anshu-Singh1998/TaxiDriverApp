import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
  Modal
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
import BasicTick from '../../../Assets/BasicTick.png';
import OutStationUpcomingRideStyle from './OutStationUpcomingRideStyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  outStationComplete,
  outStationCancelled,
  outStationUpcoming,
} from '../../redux/Slices/OutStationSlice';
import {postTrip} from '../../redux/Slices/ridesSlice';
import moment from 'moment';

const OutStationUpcomingRide = () => {
  const [selected, setSelected] = useState('Upcoming');
  const translateX = new Animated.Value(selected === 'Upcoming' ? 0 : 1);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {completed, cancelled, upcoming, loading, error} = useSelector(
    state => state.outStation,
  );
  // console.log('completed data====>>>', completed);
  // console.log('cancelled data====>>>', cancelled);
  // console.log('upcoming data====>>>', upcoming);

  const toggleSwitch = value => {
    setSelected(value);
    Animated.timing(translateX, {
      toValue: value === 'Upcoming' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    dispatch(outStationComplete());
    dispatch(outStationCancelled());
    dispatch(outStationUpcoming());
  }, [dispatch]);

  const handleYesPress = async () => {
    if (!selectedRide) return;

    const tripDetails = {
      booking_ref_no: selectedRide.booking_ref_no,
      trip_type: selectedRide.trip_type,
      pickup: selectedRide.pickup,
      drop: selectedRide.drop,
      customer_name: selectedRide.customer_name,
      customer_phone: selectedRide.customer_contact_phone,
      customer_email: selectedRide.customer_email,
      customer_address: selectedRide.customer_address,
      pickup_latitude:selectedRide.pickup_latitude,
      pickup_longitude:selectedRide.pickup_longitude,
      drop_latitude:selectedRide.drop_latitude,
      drop_longitude:selectedRide.drop_longitude
    };

    try {
      const response = await dispatch(postTrip(tripDetails)).unwrap(); // get real accepted data
      console.log('Accept response ===>>>', response);

      if (response?.data) {
        const updatedRide = {
          ...selectedRide,
          ...response.data, // merge accepted data (id will now be correct)
        };
        console.log('UpdatedRide===>>>>', updatedRide);
        setSelectedRide(updatedRide); // update state

        setConfirmationModal(false);
        navigation.navigate('Home', {
          openModal: true,
          rideDetails: updatedRide, // pass the updated ride with correct ID
        });
      }
    } catch (error) {
      console.error('Error accepting trip:', error);
    }
  };

  const renderContent = () => {
    switch (selected) {
      case 'Upcoming':
        return (
          <View style={OutStationUpcomingRideStyle.RideBoxView}>
            <FlatList
              data={upcoming}
              keyExtractor={item => item.id.toString()} // Ensure key is unique
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                // console.log('Item====>>>', item),
                <View style={OutStationUpcomingRideStyle.RideInfoViewMain}>
                  <View style={OutStationUpcomingRideStyle.RideInfoView}>
                    <View style={OutStationUpcomingRideStyle.BottomBorder}>
                      <View style={OutStationUpcomingRideStyle.DateTimeRow}>
                        <View>
                          <Image
                            source={Calender}
                            style={OutStationUpcomingRideStyle.CalenderImg}
                            resizeMode="contain"
                          />
                        </View>

                        <View>
                          <Text
                            style={
                              OutStationUpcomingRideStyle.CalenderDateText
                            }>
                            {moment(item.datetime).format('DD-MM-YYYY')}
                          </Text>
                        </View>
                        <View
                          style={
                            OutStationUpcomingRideStyle.CalenderAtTextView
                          }>
                          <Text
                            style={OutStationUpcomingRideStyle.CalenderAtText}>
                            at
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={
                              OutStationUpcomingRideStyle.CalenderTimeText
                            }>
                            {moment(item.datetime).format('hh:mm A')}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View>
                          <Text style={OutStationUpcomingRideStyle.RideId}>
                            Ride Id {item.id}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={OutStationUpcomingRideStyle.CompassView}>
                      <View style={OutStationUpcomingRideStyle.step}>
                        <Image
                          source={Compass}
                          style={OutStationUpcomingRideStyle.CompassText}
                          resizeMode="contain"
                        />
                        <Text style={OutStationUpcomingRideStyle.textSteps}>
                          {item.pickup}
                        </Text>
                      </View>
                      <View style={OutStationUpcomingRideStyle.lineView}>
                        <View style={OutStationUpcomingRideStyle.line}></View>
                      </View>

                      {/* End Location */}
                      <View style={OutStationUpcomingRideStyle.step}>
                        <Image
                          source={Destination}
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenWidth(7),
                          }}
                          resizeMode="contain"
                        />
                        <Text style={OutStationUpcomingRideStyle.textSteps}>
                          {item.drop}
                        </Text>
                      </View>
                    </View>
                    <View style={OutStationUpcomingRideStyle.StartBtnView}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedRide(item); // Store the clicked ride
                          setConfirmationModal(true);
                        }}
                        style={OutStationUpcomingRideStyle.StartBtn}>
                        <Text style={OutStationUpcomingRideStyle.StartBtnText}>
                          Accept
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
            <Modal
              visible={confirmationModal}
              transparent
              animationType="slide">
              <View style={OutStationUpcomingRideStyle.modalContainer}>
                <View
                  style={[
                    OutStationUpcomingRideStyle.modalContent,
                    {backgroundColor: '#0C3384'},
                  ]}>
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
                        OutStationUpcomingRideStyle.subTitle,
                        {textAlign: 'center', width: responsiveScreenWidth(50)},
                      ]}>
                      Are you sure that you are on way to the of pick up
                      location
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
                        OutStationUpcomingRideStyle.button,
                        {
                          backgroundColor: '#0C3384',
                          borderRadius: responsiveScreenWidth(2),
                          width: responsiveScreenWidth(30),
                          borderColor: '#000',
                          borderWidth: 1,
                          padding: responsiveScreenHeight(2),
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      ]}
                      onPress={() => setConfirmationModal(false)}>
                      <Text style={OutStationUpcomingRideStyle.buttonText}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        {
                          backgroundColor: '#04B725',
                          width: responsiveScreenWidth(30),
                          borderRadius: responsiveScreenWidth(2),
                          borderColor: '#000',
                          borderWidth: 1,
                          padding: responsiveScreenHeight(2),
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      ]}
                      onPress={handleYesPress}>
                      <Text style={OutStationUpcomingRideStyle.buttonText}>
                        Yes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        );
      case 'Completed':
        return (
          <>
            <View style={OutStationUpcomingRideStyle.RideBoxView}>
              <FlatList
                data={completed}
                keyExtractor={item => item.id.toString()} // Ensure key is unique
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  // console.log('Item====>>>', item),
                  <View style={{paddingBottom: responsiveScreenHeight(4)}}>
                    <View
                      style={OutStationUpcomingRideStyle.RideBox}
                      key={index}>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          S.No :{item.id}
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Customer Name :{item.customer_name}
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Booking Ref No :{item.booking_ref_no}
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Pickup :{item.pickup}
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Drop :{item.drop}
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Pickup Date :
                          {moment(item.pickup_time).format('DD-MM-YYYY')}
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Pickup Time :
                          {moment(item.pickup_time).format('hh:mm A')}
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Package :{item.package_type}
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          No of persons :
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Estimate fare and time : {item.total_rupees}{' '}
                          {moment(item.drop_time).format('hh:mm A')}
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Car Type :
                        </Text>
                      </View>
                      <View>
                        <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                          Trip Type :{item.trip_type}
                        </Text>
                      </View>
                      <View
                        style={OutStationUpcomingRideStyle.ArrivalStatusRow}>
                        <View>
                          <Text
                            style={
                              OutStationUpcomingRideStyle.ArrivalStatusText
                            }>
                            Arrival Status :
                          </Text>
                        </View>
                        <View
                          style={
                            OutStationUpcomingRideStyle.ArrivalStatusRowView
                          }>
                          <View
                            style={OutStationUpcomingRideStyle.FinishedView}>
                            <View
                              style={
                                OutStationUpcomingRideStyle.FinishedTextView
                              }>
                              <Text
                                style={
                                  OutStationUpcomingRideStyle.FinishedText
                                }>
                                {item.status}
                              </Text>
                            </View>
                            <View
                              style={
                                OutStationUpcomingRideStyle.FinishTripView
                              }>
                              <View
                                style={
                                  OutStationUpcomingRideStyle.FinishTripTextView
                                }>
                                <Text
                                  style={
                                    OutStationUpcomingRideStyle.FinishTripText
                                  }>
                                  Finish Trip
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={OutStationUpcomingRideStyle.TollMoneyView}>
                            <View
                              style={
                                OutStationUpcomingRideStyle.TollMoneyTextView
                              }>
                              <Text
                                style={
                                  OutStationUpcomingRideStyle.TollMoneyText
                                }>
                                Toll money
                              </Text>
                            </View>
                            <View
                              style={OutStationUpcomingRideStyle.PrintBillView}>
                              <View
                                style={
                                  OutStationUpcomingRideStyle.PrintBillTextView
                                }>
                                <Text
                                  style={
                                    OutStationUpcomingRideStyle.PrintBillText
                                  }>
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
          <View style={OutStationUpcomingRideStyle.RideBoxView}>
            <FlatList
              data={cancelled}
              keyExtractor={item => item.id.toString()} // Ensure key is unique
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                // console.log('Item====>>>', item),
                <View style={{paddingBottom: responsiveScreenHeight(8)}}>
                  <View style={OutStationUpcomingRideStyle.RideBox} key={index}>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        S.No :{item.id}
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Customer Name :{item.customer_name}
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Booking Ref No :{item.booking_ref_no}
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Pickup :{item.pickup}
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Drop :{item.drop}
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Pickup Date :
                        {moment(item.pickup_time).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Pickup Time :
                        {moment(item.pickup_time).format('hh:mm A')}
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Package :{item.package_type}
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        No of persons :
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Estimate fare and time : {item.total_rupees}{' '}
                        {moment(item.drop_time).format('hh:mm A')}
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Car Type :
                      </Text>
                    </View>
                    <View>
                      <Text style={OutStationUpcomingRideStyle.TripTypeText}>
                        Trip Type :{item.trip_type}
                      </Text>
                    </View>
                    <View style={OutStationUpcomingRideStyle.ArrivalStatusRow}>
                      <View>
                        <Text
                          style={OutStationUpcomingRideStyle.ArrivalStatusText}>
                          Arrival Status :
                        </Text>
                      </View>
                      <View
                        style={
                          OutStationUpcomingRideStyle.ArrivalStatusRowView
                        }>
                        <View style={OutStationUpcomingRideStyle.FinishedView}>
                          <View
                            style={
                              OutStationUpcomingRideStyle.FinishedTextView
                            }>
                            <Text
                              style={OutStationUpcomingRideStyle.FinishedText}>
                              {item.status}
                            </Text>
                          </View>
                          <View
                            style={OutStationUpcomingRideStyle.FinishTripView}>
                            <View
                              style={
                                OutStationUpcomingRideStyle.FinishTripTextView
                              }>
                              <Text
                                style={
                                  OutStationUpcomingRideStyle.FinishTripText
                                }>
                                Finish Trip
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={OutStationUpcomingRideStyle.TollMoneyView}>
                          <View
                            style={
                              OutStationUpcomingRideStyle.TollMoneyTextView
                            }>
                            <Text
                              style={OutStationUpcomingRideStyle.TollMoneyText}>
                              Toll money
                            </Text>
                          </View>
                          <View
                            style={OutStationUpcomingRideStyle.PrintBillView}>
                            <View
                              style={
                                OutStationUpcomingRideStyle.PrintBillTextView
                              }>
                              <Text
                                style={
                                  OutStationUpcomingRideStyle.PrintBillText
                                }>
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
    <View style={OutStationUpcomingRideStyle.MainContainerView}>
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          animated={true}
        />
        <View style={OutStationUpcomingRideStyle.header}>
          <View style={OutStationUpcomingRideStyle.LeftView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Left}
                resizeMode="contain"
                style={OutStationUpcomingRideStyle.LeftImg}
              />
            </TouchableOpacity>
          </View>
          <View
            style={OutStationUpcomingRideStyle.OutStationUpcomingRideTextView}>
            <Text
              style={OutStationUpcomingRideStyle.OutStationUpcomingRideText}>
              OutStation Upcoming Rides
            </Text>
          </View>
        </View>
        <View style={OutStationUpcomingRideStyle.ToggleArea}>
          <View style={OutStationUpcomingRideStyle.switchContainer}>
            <Animated.View
              style={[
                OutStationUpcomingRideStyle.slider,
                {
                  left: translateX.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: ['0%', '33.3%', '66.6%'],
                  }),
                },
              ]}
            />
            <TouchableOpacity
              style={OutStationUpcomingRideStyle.option}
              onPress={() => toggleSwitch('Upcoming')}>
              <Text
                style={[
                  OutStationUpcomingRideStyle.text,
                  selected === 'Upcoming' &&
                    OutStationUpcomingRideStyle.selectedText,
                ]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={OutStationUpcomingRideStyle.option}
              onPress={() => toggleSwitch('Completed')}>
              <Text
                style={[
                  OutStationUpcomingRideStyle.text,
                  selected === 'Completed' &&
                    OutStationUpcomingRideStyle.selectedText,
                ]}>
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={OutStationUpcomingRideStyle.option}
              onPress={() => toggleSwitch('Cancelled')}>
              <Text
                style={[
                  OutStationUpcomingRideStyle.text,
                  selected === 'Cancelled' &&
                    OutStationUpcomingRideStyle.selectedText,
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

export default OutStationUpcomingRide;
