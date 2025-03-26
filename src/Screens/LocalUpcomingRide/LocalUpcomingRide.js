import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  OutStationUpcomingRideStyleheet,
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
import OutStationUpcomingRideStyle from './OutStationUpcomingRideStyle';

const LocalUpcomingRide = () => {
  const [selected, setSelected] = useState('Completed');
  const translateX = new Animated.Value(selected === 'Completed' ? 0 : 1);
  const navigation = useNavigation();

  const toggleSwitch = value => {
    setSelected(value);
    Animated.timing(translateX, {
      toValue: value === 'Completed' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
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
            <Image source={Left} resizeMode="contain" style={OutStationUpcomingRideStyle.LeftImg} />
          </View>
          <View style={OutStationUpcomingRideStyle.OutStationUpcomingRideTextView}>
            <Text style={OutStationUpcomingRideStyle.OutStationUpcomingRideText}>
              Local Upcoming Rides
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
                    inputRange: [0, 1],
                    outputRange: ['0%', '50%'],
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
                  selected === 'Upcoming' && OutStationUpcomingRideStyle.selectedText,
                ]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={OutStationUpcomingRideStyle.option}
              onPress={() => toggleSwitch('Cancelled')}>
              <Text
                style={[
                  OutStationUpcomingRideStyle.text,
                  selected === 'Cancelled' && OutStationUpcomingRideStyle.selectedText,
                ]}>
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
                  <Text style={OutStationUpcomingRideStyle.CalenderDateText}>20 Dec 2024</Text>
                </View>
                <View style={OutStationUpcomingRideStyle.CalenderAtTextView}>
                  <Text style={OutStationUpcomingRideStyle.CalenderAtText}>at</Text>
                </View>
                <View>
                  <Text style={OutStationUpcomingRideStyle.CalenderTimeText}>01:59pm</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text style={OutStationUpcomingRideStyle.RideId}>Ride Id #433</Text>
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
                  Tiruppur, Tamil Nadu, India
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
                <Text style={OutStationUpcomingRideStyle.textSteps}>Salem, Tamil Nadu, India</Text>
              </View>
            </View>
            <View style={OutStationUpcomingRideStyle.StartBtnView}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home', {openModal: true})}
                style={OutStationUpcomingRideStyle.StartBtn}>
                <Text style={OutStationUpcomingRideStyle.StartBtnText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LocalUpcomingRide;
