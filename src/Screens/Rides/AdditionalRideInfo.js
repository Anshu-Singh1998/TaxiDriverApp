import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  AdditionalRideInfoStyleheet,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import {TextInput} from 'react-native-paper';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {Dropdown} from 'react-native-element-dropdown';
import AdditionalRideInfoStyle from "./AdditionalRideInfoStyle"

const AdditionalRideInfo = () => {
  const [text, setText] = useState('');
  const [ride, setRide] = useState(null);

  const RideInfo = [
    {label: 'AC Charges', value: 'AC Charges'},
    {label: 'Extra Customer', value: 'Extra Customer'},
    {label: 'Extra Luggage', value: 'Extra Luggage'},
    {label: 'Others', value: 'Others'},
  ];

  return (
    <View style={AdditionalRideInfoStyle.container}>
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          animated={true}
        />
        <View style={AdditionalRideInfoStyle.header}>
          <TouchableOpacity
            style={AdditionalRideInfoStyle.backButton}
            onPress={() => navigation.goBack()}>
            <Image source={Left} resizeMode="contain" style={AdditionalRideInfoStyle.backIcon} />
          </TouchableOpacity>
          <Text style={AdditionalRideInfoStyle.headerTitle}>Additional Ride Info</Text>
        </View>

        <View style={AdditionalRideInfoStyle.FormView}>
          <View>
            <TextInput
              label="End Kilometers"
              mode="outlined"
              value={text}
              onChangeText={text => setText(text)}
              style={AdditionalRideInfoStyle.input}
              keyboardType="number-pad"
            />
          </View>
          <View>
            <TextInput
              label="Total Hour(s) Travelled"
              mode="outlined"
              value={text}
              onChangeText={text => setText(text)}
              style={AdditionalRideInfoStyle.input}
              keyboardType="number-pad"
            />
          </View>
          <View>
            <Dropdown
              style={AdditionalRideInfoStyle.dropdown}
              placeholderStyle={AdditionalRideInfoStyle.placeholderStyle}
              selectedTextStyle={AdditionalRideInfoStyle.selectedTextStyle}
              data={RideInfo}
              labelField="label"
              valueField="value"
              placeholder="Additional Charge"
              value={ride}
              onChange={item => setRide(item.value)}
              // Disable if no options
            />
          </View>
          <View style={{paddingTop: responsiveScreenHeight(3)}}>
            <TouchableOpacity style={[AdditionalRideInfoStyle.button]}>
              <Text style={AdditionalRideInfoStyle.buttonText}>Finish Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdditionalRideInfo;
