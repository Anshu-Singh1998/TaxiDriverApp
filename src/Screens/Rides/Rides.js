import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  RideStyleheet,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import RideStyle from './RideStyle';
import {useNavigation} from '@react-navigation/native';

const Rides = () => {
  const [selected, setSelected] = useState('Upcoming');
  const translateX = new Animated.Value(selected === 'Upcoming' ? 0 : 1);
  const navigation = useNavigation();

  const upcomingRides = [
    {
      id: 433,
      date: '20 Dec 2024',
      time: '01:59pm',
      start: 'Tiruppur, Tamil Nadu, India',
      end: 'Salem, Tamil Nadu, India',
      SNo: 1,
      CustomerName: 'Divya',
      BookingRefNo: 2345,
      Pickup: 'Tiruppur',
      Drop: 'VSA Nagar',
      PickupDate: '30/12/2024',
      PickupTime: '1:00',
      Package: '200/-',
      Noofpersons: '2',
      Estimatefareandtime: '',
      CarType: 'non /AC',
      TripType: 'Regular Travel',
    },
  ];
  const cancelledRides = []; // Empty array to simulate no data

  const toggleSwitch = value => {
    setSelected(value);
    Animated.timing(translateX, {
      toValue: value === 'Upcoming' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const ridesToShow = selected === 'Upcoming' ? upcomingRides : cancelledRides;
  return (
    <View style={RideStyle.MainContainer}>
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#0C3384"
          animated={true}
        />
        <View style={RideStyle.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Left} resizeMode="contain" style={RideStyle.backIcon} />
          </TouchableOpacity>
          <Text style={RideStyle.headerTitle}>About Us</Text>
        </View>
        <View style={{}}></View>
        <View style={RideStyle.switchContainer}>
          <Animated.View
            style={[
              RideStyle.slider,
              {
                left: translateX.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '50%'],
                }),
              },
            ]}
          />
          <TouchableOpacity
            style={RideStyle.option}
            onPress={() => toggleSwitch('Upcoming')}>
            <Text
              style={[
                RideStyle.text,
                selected === 'Upcoming' && RideStyle.selectedText,
              ]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={RideStyle.option}
            onPress={() => toggleSwitch('Cancelled')}>
            <Text
              style={[
                RideStyle.text,
                selected === 'Cancelled' && RideStyle.selectedText,
              ]}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>
        <View style={RideStyle.RideBoxView}>
          {ridesToShow.length > 0 ? (
            ridesToShow.map(ride => (
              <View key={ride.id} style={RideStyle.RideBox}>
                <View>
                  <Text style={RideStyle.TripTypeText}>S.No : {ride.SNo}</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Customer Name : {ride.CustomerName}
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Booking Ref No : {ride.BookingRefNo}
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Pickup : {ride.Pickup}
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Drop : {ride.Drop}</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Pickup Date : {ride.PickupDate}
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Pickup Time : {ride.PickupTime}
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Package :{ride.Package}
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    No of persons : {ride.Noofpersons}
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Estimate fare and time :{ride.Estimatefareandtime}
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Car Type : {ride.CarType}
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Trip Type : {ride.TripType}
                  </Text>
                </View>
                <View style={RideStyle.ArrivalStatusRow}>
                  <View>
                    <Text style={RideStyle.ArrivalStatusText}>
                      Arrival Status :
                    </Text>
                  </View>
                  <View style={RideStyle.ArrivalStatusRowView}>
                    <View style={RideStyle.FinishedView}>
                      <View style={RideStyle.FinishedTextView}>
                        <Text style={RideStyle.FinishedText}>Finished</Text>
                      </View>
                      <View style={RideStyle.FinishTripView}>
                        <View style={RideStyle.FinishTripTextView}>
                          <Text style={RideStyle.FinishTripText}>Finish Trip</Text>
                        </View>
                      </View>
                    </View>
                    <View style={RideStyle.TollMoneyView}>
                      <View style={RideStyle.TollMoneyTextView}>
                        <Text style={RideStyle.TollMoneyText}>Toll money</Text>
                      </View>
                      <View style={RideStyle.PrintBillView}>
                        <View style={RideStyle.PrintBillTextView}>
                          <Text style={RideStyle.PrintBillText}>Print Bill</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={RideStyle.noDataText}>No Data Available</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Rides;
