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
import React, {useState} from 'react';
import Left from '../../../Assets/Left.png';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {LineChart} from 'react-native-chart-kit';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import EarningStyle from './EarningStyle';

const Earnings = () => {
  const [selected, setSelected] = useState('Today');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [openPicker, setOpenPicker] = useState(null);
  const translateX = new Animated.Value(
    selected === 'Today' ? 0 : selected === 'Weekly' ? 1 : 2,
  );
  const navigation = useNavigation();

  const toggleSwitch = value => {
    setSelected(value);
    Animated.timing(translateX, {
      toValue: value === 'Today' ? 0 : value === 'Weekly' ? 1 : 2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const earningsData = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const renderContent = () => {
    switch (selected) {
      case 'Today':
        return (
          <View style={EarningStyle.TodayEarningContainer}>
            <View style={EarningStyle.TodayRidesRow}>
              <Text style={EarningStyle.TodayRides}>Rides</Text>
              <Text style={EarningStyle.TodayRidesValue}>₹ 0</Text>
            </View>
            <View style={EarningStyle.TodayDriverEarningRow}>
              <Text style={EarningStyle.TodayDriverEarning}>
                Driver Earning
              </Text>
              <Text style={EarningStyle.TodayDriverEarningValue}>₹ 0.00</Text>
            </View>
            <View style={EarningStyle.TodayWalletEarningRow}>
              <Text style={EarningStyle.TodayWalletEarning}>
                Wallet Earning
              </Text>
              <Text style={EarningStyle.TodayWalletEaringValue}>₹ 0.00</Text>
            </View>
            <View style={EarningStyle.TodayTotalEarningsBorder}></View>
            <View style={EarningStyle.TodayTotalEarningsRow}>
              <Text style={EarningStyle.TodayTotalRidesEarning}>
                Total Rides Earning
              </Text>
              <Text style={EarningStyle.TodayTotalRidesEarningValue}>
                ₹ 0.00
              </Text>
            </View>
          </View>
        );
      case 'Weekly':
        return (
          <>
            <View style={EarningStyle.container}>
              {/* <Text style={EarningStyle.title}>Weekly Earnings</Text> */}
              {/* <Text style={EarningStyle.amount}>
                ₹{earningsData[earningsData.length - 1]}
              </Text> */}

              <LineChart
                data={{
                  labels: labels,
                  datasets: [{data: earningsData}],
                }}
                width={Dimensions.get('window').width - 40} // Responsive width
                height={responsiveScreenHeight(30)}
                yAxisLabel="₹"
                chartConfig={{
                  backgroundColor: '#0A2C7D',
                  backgroundGradientFrom: '#0C3384',
                  backgroundGradientTo: '#0A2C7D',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {borderRadius: 16},
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={EarningStyle.graphStyle}
              />
            </View>
            <View style={EarningStyle.WeeklyEarningContainer}>
              <View style={EarningStyle.WeeklyRidesRow}>
                <Text style={EarningStyle.WeeklyRides}>Rides</Text>
                <Text style={EarningStyle.WeeklyRidesValue}>₹ 0</Text>
              </View>
              <View style={EarningStyle.WeeklyDriverEarningRow}>
                <Text style={EarningStyle.WeeklyDriverEarning}>
                  Driver Earning
                </Text>
                <Text style={EarningStyle.WeeklyDriverEarningValue}>
                  ₹ 0.00
                </Text>
              </View>
              <View style={EarningStyle.WeeklyWalletEarningRow}>
                <Text style={EarningStyle.WeeklyWalletEarning}>
                  Wallet Earning
                </Text>
                <Text style={EarningStyle.WeeklyWalletEaringValue}>₹ 0.00</Text>
              </View>
              <View style={EarningStyle.WeeklyTotalEarningsBorder}></View>
              <View style={EarningStyle.WeeklyTotalEarningsRow}>
                <Text style={EarningStyle.WeeklyTotalRidesEarning}>
                  Total Rides Earning
                </Text>
                <Text style={EarningStyle.WeeklyTotalRidesEarningValue}>
                  ₹ 0.00
                </Text>
              </View>
            </View>
          </>
        );
      case 'Report':
        return (
          <View>
            <View style={EarningStyle.DateBtnRow}>
              <View>
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
            <View style={EarningStyle.ReportEarningContainer}>
              <View style={EarningStyle.ReportRidesRow}>
                <Text style={EarningStyle.ReportRides}>Rides</Text>
                <Text style={EarningStyle.ReportRidesValue}>₹ 0</Text>
              </View>
              <View style={EarningStyle.ReportDriverEarningRow}>
                <Text style={EarningStyle.ReportDriverEarning}>
                  Driver Earning
                </Text>
                <Text style={EarningStyle.ReportDriverEarningValue}>
                  ₹ 0.00
                </Text>
              </View>
              <View style={EarningStyle.ReportWalletEarningRow}>
                <Text style={EarningStyle.ReportWalletEarning}>
                  Wallet Earning
                </Text>
                <Text style={EarningStyle.ReportWalletEarningRow}>₹ 0.00</Text>
              </View>
              <View style={EarningStyle.ReportTotalEarningsBorder}></View>
              <View style={EarningStyle.TodayTotalEarningsRow}>
                <Text style={EarningStyle.TodayTotalRidesEarning}>
                  Total Rides Earning
                </Text>
                <Text style={EarningStyle.TodayTotalRidesEarningValue}>
                  ₹ 0.00
                </Text>
              </View>
            </View>
          </View>
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
