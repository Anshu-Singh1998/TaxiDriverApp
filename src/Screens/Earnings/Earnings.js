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
import {responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
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

  const renderContent = () => {
    switch (selected) {
      case 'Today':
        return (
          <View style={EarningStyle.RideBoxView}>
            <View style={EarningStyle.RideBox}>
              <View>
                <Text style={EarningStyle.TripTypeText}>Rides : </Text>
              </View>
              <View>
                <Text style={EarningStyle.TripTypeText}>
                  Driver Earnings :{' '}
                </Text>
              </View>
              <View>
                <Text style={EarningStyle.TripTypeText}>Wallet Earnings: </Text>
              </View>
              <View>
                <Text style={EarningStyle.TripTypeText}>
                  Total Ride Hours :{' '}
                </Text>
              </View>
              <View>
                <Text style={EarningStyle.TripTypeText}>Hours Earning : </Text>
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
                    Weekly Earning :{' '}
                  </Text>
                </View>
                <View>
                  <Text style={EarningStyle.TripTypeText}>Weekly Hours : </Text>
                </View>
              </View>
            </View>
          </>
        );
      case 'Report':
        return (
          <View style={EarningStyle.RideBoxView}>
            <View style={EarningStyle.RideBox}>
              <View style={EarningStyle.DateBtnRow}>
                <View style={{left:responsiveScreenWidth(-10)}}>
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
                <TouchableOpacity style={EarningStyle.GenerateBtn}>
                  <Text style={EarningStyle.GenerateBtnText}>Generate</Text>
                </TouchableOpacity>
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
