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
import {TextInput} from 'react-native-paper';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {Dropdown} from 'react-native-element-dropdown';

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
    <View style={{flex: 1}}>
      <View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          animated={true}
        />
        <View
          style={{
            height: 80,
            width: '100%',
            backgroundColor: '#0C3384',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              paddingLeft: responsiveScreenWidth(4),
              paddingTop: responsiveScreenHeight(1),
            }}>
            <Image
              source={Left}
              resizeMode="contain"
              style={{
                height: responsiveScreenHeight(6),
                width: responsiveScreenWidth(12),
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              paddingLeft: responsiveScreenWidth(4),
              paddingTop: responsiveScreenHeight(1),
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: responsiveScreenFontSize(3),
                lineHeight: 40,
                color: '#FFF',
              }}>
              Additional Ride Info
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingTop: responsiveScreenHeight(4),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <TextInput
              label="End Kilometers"
              mode="outlined"
              value={text}
              onChangeText={text => setText(text)}
              style={styles.input}
              keyboardType="number-pad"
            />
          </View>
          <View>
            <TextInput
              label="Total Hour(s) Travelled"
              mode="outlined"
              value={text}
              onChangeText={text => setText(text)}
              style={styles.input}
              keyboardType="number-pad"
            />
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
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
            <TouchableOpacity style={[styles.button, {alignSelf: 'center'}]}>
              <Text style={styles.buttonText}>Finish Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  switchContainer: {
    width: 400,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: '#0A2C7D',
    borderRadius: 25,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2C7D',
  },
  selectedText: {
    color: '#fff',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textSteps: {
    fontSize: 14,
    color: '#333',
  },
  line: {
    marginLeft: 9, // Align with icons
  },
  dash: {
    width: responsiveScreenWidth(1), // Vertical Line
    height: 100, // Adjust height
    flexDirection: 'column', // For vertical alignment
  },
  input: {
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dropdown: {
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(3),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),

    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default AdditionalRideInfo;
