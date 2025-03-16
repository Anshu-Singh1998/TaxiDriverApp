import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
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

const OutStationRides = () => {
  const [selected, setSelected] = useState('Upcoming');
  const translateX = new Animated.Value(selected === 'Upcoming' ? 0 : 1);

  const toggleSwitch = value => {
    setSelected(value);
    Animated.timing(translateX, {
      toValue: value === 'Upcoming' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={styles.MainContainer}>
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          animated={true}
        />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image source={Left} resizeMode="contain" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>OutStation Rides</Text>
        </View>
        <View style={styles.SwitchContainerSpace}>
          <View style={styles.switchContainer}>
            <Animated.View
              style={[
                styles.slider,
                {
                  left: translateX.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '50%'],
                  }),
                },
              ]}
            />
            <TouchableOpacity
              style={styles.option}
              onPress={() => toggleSwitch('Upcoming')}>
              <Text
                style={[
                  styles.text,
                  selected === 'Upcoming' && styles.selectedText,
                ]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => toggleSwitch('Cancelled')}>
              <Text
                style={[
                  styles.text,
                  selected === 'Cancelled' && styles.selectedText,
                ]}>
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.BoundaryViewSpacing}>
          <View style={styles.BoundaryView}>
            <View style={styles.BottomBorderLine}>
              <View style={styles.ViewRow}>
                <View>
                  <Image
                    source={Calender}
                    style={styles.CalenderImg}
                    resizeMode="contain"
                  />
                </View>

                <View>
                  <Text style={styles.DateText}>20 Dec 2024</Text>
                </View>
                <View style={styles.SpacingDateTime}>
                  <Text style={styles.AtText}>at</Text>
                </View>
                <View>
                  <Text style={styles.TimeText}>01:59pm</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text style={styles.RideId}>Ride Id #433</Text>
                </View>
              </View>
            </View>
            <View style={styles.stepper}>
              <View style={styles.step}>
                <Image
                  source={Compass}
                  style={styles.CompassImg}
                  resizeMode="contain"
                />
                <Text style={styles.textSteps}>
                  Tiruppur, Tamil Nadu, India
                </Text>
              </View>
              <View style={styles.lineView}>
                <View style={styles.line}></View>
              </View>

              {/* End Location */}
              <View style={styles.step}>
                <Image
                  source={Destination}
                  style={styles.DestinationImg}
                  resizeMode="contain"
                />
                <Text style={styles.textSteps}>Salem, Tamil Nadu, India</Text>
              </View>
            </View>
            <View style={styles.StartBtnView}>
              <TouchableOpacity style={styles.StartBtn}>
                <Text style={styles.StarText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OutStationRides;
