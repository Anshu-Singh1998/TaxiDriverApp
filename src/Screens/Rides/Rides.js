import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
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
import {useNavigation} from '@react-navigation/native';
import RideStyle from './RideStyle';

const Rides = () => {
  const [selected, setSelected] = useState('Upcoming');
  const translateX = new Animated.Value(selected === 'Upcoming' ? 0 : 1);
  const navigation = useNavigation();

  const toggleSwitch = value => {
    setSelected(value);
    Animated.timing(translateX, {
      toValue: value === 'Upcoming' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const renderContent = () => {
    switch (selected) {
      case 'Upcoming':
        return (
          <View style={RideStyle.RideInfoViewMain}>
            <View style={RideStyle.RideInfoView}>
              <View style={RideStyle.BottomBorder}>
                <View style={RideStyle.DateTimeRow}>
                  <View>
                    <Image
                      source={Calender}
                      style={RideStyle.CalenderImg}
                      resizeMode="contain"
                    />
                  </View>

                  <View>
                    <Text style={RideStyle.CalenderDateText}>20 Dec 2024</Text>
                  </View>
                  <View style={RideStyle.CalenderAtTextView}>
                    <Text style={RideStyle.CalenderAtText}>at</Text>
                  </View>
                  <View>
                    <Text style={RideStyle.CalenderTimeText}>01:59pm</Text>
                  </View>
                </View>
                <View>
                  <View>
                    <Text style={RideStyle.RideId}>Ride Id #433</Text>
                  </View>
                </View>
              </View>
              <View style={RideStyle.CompassView}>
                <View style={RideStyle.step}>
                  <Image
                    source={Compass}
                    style={RideStyle.CompassText}
                    resizeMode="contain"
                  />
                  <Text style={RideStyle.textSteps}>
                    Tiruppur, Tamil Nadu, India
                  </Text>
                </View>
                <View style={RideStyle.lineView}>
                  <View style={RideStyle.line}></View>
                </View>

                {/* End Location */}
                <View style={RideStyle.step}>
                  <Image
                    source={Destination}
                    style={{
                      height: responsiveScreenHeight(4),
                      width: responsiveScreenWidth(7),
                    }}
                    resizeMode="contain"
                  />
                  <Text style={RideStyle.textSteps}>
                    Salem, Tamil Nadu, India
                  </Text>
                </View>
              </View>
              <View style={RideStyle.StartBtnView}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Home', {openModal: true})}
                  style={RideStyle.StartBtn}>
                  <Text style={RideStyle.StartBtnText}>Start</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case 'Completed':
        return (
          <>
            <View style={RideStyle.RideBoxView}>
              <View style={RideStyle.RideBox}>
                <View>
                  <Text style={RideStyle.TripTypeText}>S.No : </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Customer Name :</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Booking Ref No :</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Pickup :</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Drop : </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Pickup Date :</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Pickup Time :</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Package :</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>No of persons :</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>
                    Estimate fare and time :
                  </Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Car Type :</Text>
                </View>
                <View>
                  <Text style={RideStyle.TripTypeText}>Trip Type :</Text>
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
                          <Text style={RideStyle.FinishTripText}>
                            Finish Trip
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={RideStyle.TollMoneyView}>
                      <View style={RideStyle.TollMoneyTextView}>
                        <Text style={RideStyle.TollMoneyText}>Toll money</Text>
                      </View>
                      <View style={RideStyle.PrintBillView}>
                        <View style={RideStyle.PrintBillTextView}>
                          <Text style={RideStyle.PrintBillText}>
                            Print Bill
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        );
      case 'Cancelled':
        return (
          <View style={RideStyle.RideBoxView}>
            <View style={RideStyle.RideBox}>
              <View>
                <Text style={RideStyle.TripTypeText}>S.No : </Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>Customer Name :</Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>Booking Ref No :</Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>Pickup :</Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>Drop : </Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>Pickup Date :</Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>Pickup Time :</Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>Package :</Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>No of persons :</Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>
                  Estimate fare and time :
                </Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>Car Type :</Text>
              </View>
              <View>
                <Text style={RideStyle.TripTypeText}>Trip Type :</Text>
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
                        <Text style={RideStyle.FinishTripText}>
                          Finish Trip
                        </Text>
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
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={RideStyle.MainContainerView}>
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          animated={true}
        />
        <View style={RideStyle.header}>
          <View style={RideStyle.LeftView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Left}
                resizeMode="contain"
                style={RideStyle.LeftImg}
              />
            </TouchableOpacity>
          </View>
          <View style={RideStyle.OutStationUpcomingRideTextView}>
            <Text style={RideStyle.OutStationUpcomingRideText}>Rides</Text>
          </View>
        </View>
        <View style={RideStyle.ToggleArea}>
          <View style={RideStyle.switchContainer}>
            <Animated.View
              style={[
                RideStyle.slider,
                {
                  left: translateX.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: ['0%', '33.3%', '66.6%'],
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
              onPress={() => toggleSwitch('Completed')}>
              <Text
                style={[
                  RideStyle.text,
                  selected === 'Completed' && RideStyle.selectedText,
                ]}>
                Completed
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
        </View>
        <View>{renderContent()}</View>
      </View>
    </View>
  );
};

export default Rides;
