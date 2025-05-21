import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  EarningStyleheet,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Left from '../../../Assets/Left.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {LineChart} from 'react-native-chart-kit';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import EarningStyle from './EarningStyle';
import {
  fetchToday,
  fetchWeekly,
  fetchReport,
} from '../../redux/Slices/EarningSlice';
import {useDispatch, useSelector} from 'react-redux';

const Earnings = () => {
  const [selected, setSelected] = useState('Today');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [openPicker, setOpenPicker] = useState(null);
  const {today, weekly, report} = useSelector(state => state.earning);
  console.log('Today==========>>>>>>', today);
  console.log('Weekly==========>>>>>>', weekly);
  console.log('Report==========>>>>>>', report);
  const translateX = new Animated.Value(
    selected === 'Today' ? 0 : selected === 'Weekly' ? 1 : 2,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleSwitch = value => {
    setSelected(value);
    Animated.timing(translateX, {
      toValue: value === 'Today' ? 0 : value === 'Weekly' ? 1 : 2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    dispatch(fetchToday());
    dispatch(fetchWeekly());
  }, []);

  const renderContent = () => {
    switch (selected) {
      case 'Today':
        return (
          <View style={EarningStyle.RideBoxView}>
            <View style={EarningStyle.RideBox}>
              <View>
                <Text style={EarningStyle.TripTypeText}>
                  Rides :{today.rides}
                </Text>
              </View>
              <View>
                <Text style={EarningStyle.TripTypeText}>
                  Driver Earnings :{today.driver_earnings}
                </Text>
              </View>
              <View>
                <Text style={EarningStyle.TripTypeText}>
                  Wallet Earnings:{today.earnings}
                </Text>
              </View>
              <View>
                <Text style={EarningStyle.TripTypeText}>
                  Total Ride Hours :{today.total_hours}
                </Text>
              </View>
              <View>
                <Text style={EarningStyle.TripTypeText}>
                  status :{today.status}
                </Text>
              </View>
            </View>
          </View>
        );
      case 'Weekly':
        return (
          <>
            <View style={EarningStyle.RideBoxView}>
              <View style={EarningStyle.RideBox}>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    Rides :{weekly.rides}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    Driver Earnings :{weekly.driver_earnings}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    Wallet Earnings:{weekly.earnings}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    Total Ride Hours :{weekly.total_hours}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    status :{weekly.status}
                  </Text>
                </View>
              </View>
            </View>
          </>
        );
      case 'Report':
        return (
          <>
            <View style={EarningStyle.RideBoxView}>
              <View style={EarningStyle.RideBox}>
                <View style={EarningStyle.DateBtnRow}>
                  <View style={{left: responsiveScreenWidth(-10)}}>
                    <Text style={EarningStyle.TripTypeText}>From</Text>
                    <TouchableOpacity
                      style={EarningStyle.DateBtn}
                      onPress={() => setOpenPicker('from')}>
                      <Text>From:{moment(fromDate).format('YYYY-MM-DD')}</Text>
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={openPicker === 'from'}
                      mode="date"
                      date={fromDate}
                      onConfirm={date => {
                        setOpenPicker(null);
                        setFromDate(date);
                      }}
                      onCancel={() => setOpenPicker(null)}
                    />
                  </View>
                  <View>
                    <Text style={EarningStyle.TripTypeText}>To</Text>
                    <TouchableOpacity
                      style={EarningStyle.DateBtn}
                      onPress={() => setOpenPicker('to')}>
                      <Text>To:{moment(toDate).format('YYYY-MM-DD')}</Text>
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={openPicker === 'to'}
                      mode="date"
                      date={toDate}
                      onConfirm={date => {
                        setOpenPicker(null);
                        setToDate(date);
                      }}
                      onCancel={() => setOpenPicker(null)}
                    />
                  </View>
                </View>
                <View style={EarningStyle.GenerateBtnView}>
                  <TouchableOpacity
                    style={EarningStyle.GenerateBtn}
                    onPress={() => {
                      dispatch(
                        fetchReport({
                          from_date: moment(fromDate).format('YYYY-MM-DD'),
                          to_date: moment(toDate).format('YYYY-MM-DD'),
                        }),
                      );
                    }}>
                    <Text style={EarningStyle.GenerateBtnText}>Generate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={EarningStyle.RideBoxView}>
              <View style={EarningStyle.RideBox}>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    Rides :{report.rides}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    Driver Earnings :{report.driver_earnings}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    Wallet Earnings:{report.earnings}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    Total Ride Hours :{report.total_hours}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    status :{report.status}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>
                    Date :{report.label}
                  </Text>
                </View>
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={EarningStyle.EarningContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0C3384" animated />
      <View style={EarningStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Left}
            resizeMode="contain"
            style={EarningStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={EarningStyle.headerTitle}>Earnings</Text>
      </View>

      <View style={EarningStyle.switchContainer}>
        <Animated.View
          style={[
            EarningStyle.slider,
            {
              left: translateX.interpolate({
                inputRange: [0, 1, 2],
                outputRange: ['0%', '33.3%', '66.6%'],
              }),
            },
          ]}
        />
        <TouchableOpacity
          style={EarningStyle.option}
          onPress={() => toggleSwitch('Today')}>
          <Text
            style={[
              EarningStyle.text,
              selected === 'Today' && EarningStyle.selectedText,
            ]}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={EarningStyle.option}
          onPress={() => toggleSwitch('Weekly')}>
          <Text
            style={[
              EarningStyle.text,
              selected === 'Weekly' && EarningStyle.selectedText,
            ]}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={EarningStyle.option}
          onPress={() => toggleSwitch('Report')}>
          <Text
            style={[
              EarningStyle.text,
              selected === 'Report' && EarningStyle.selectedText,
            ]}>
            Report
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View>{renderContent()}</View>
    </View>
  );
};

export default Earnings;
