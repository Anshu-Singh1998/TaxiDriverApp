import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  FlatList
} from 'react-native';
import React from 'react';
import {useState,useEffect} from 'react';
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
import {fetchOngoingTrips} from '../../redux/Slices/ridesSlice';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';


// Remove toggle just ongoing ride will be there a simple view

const Rides = () => {
  const [selected, setSelected] = useState('Upcoming');
  const translateX = new Animated.Value(selected === 'Upcoming' ? 0 : 1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {ongoingTrips} = useSelector(state => state.trips);

  useEffect(() => {
    dispatch(fetchOngoingTrips());
  }, [dispatch]);
  // console.log('Ongoing rides====>>>>', ongoingTrips);

  
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
        <View style={RideStyle.RideBoxView}>
            <FlatList
              data={ongoingTrips}
              keyExtractor={item => item.id.toString()} // Ensure key is unique
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
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
                          <Text style={RideStyle.CalenderDateText}>
                            {moment(item.datetime).format('DD-MM-YYYY')}
                          </Text>
                        </View>
                        <View style={RideStyle.CalenderAtTextView}>
                          <Text style={RideStyle.CalenderAtText}>
                            at
                          </Text>
                        </View>
                        <View>
                          <Text style={RideStyle.CalenderTimeText}>
                            {moment(item.datetime).format('hh:mm A')}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View>
                          <Text style={RideStyle.RideId}>
                            Ride Id {item.booking_ref_no}
                          </Text>
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
                          {item.pickup}
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
                          {item.drop}
                        </Text>
                      </View>
                    </View>
                    <View style={RideStyle.StartBtnView}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Home', {
                            openModal: true,
                            rideDetails: item,
                          })
                        }
                        style={RideStyle.StartBtn}>
                        <Text style={RideStyle.StartBtnText}>
                          Start
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
      </View>
    </View>
  );
};

export default Rides;
