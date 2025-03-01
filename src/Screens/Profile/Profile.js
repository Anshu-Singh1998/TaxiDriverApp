import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import * as React from 'react';
import {useState, useRef} from 'react';
import {TextInput} from 'react-native-paper';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Left from '../../../Assets/Left.png';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [text, setText] = React.useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [formattedPhoneValue, setFormattedPhoneValue] = useState('');
const navigation = useNavigation()
  // Correct ref declaration
  const phoneInput = useRef(null);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Left} resizeMode="contain" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: responsiveScreenHeight(3),
          }}>
          <View
            style={{
              height: responsiveScreenHeight(12),
              width: responsiveScreenHeight(12),
              borderRadius: responsiveScreenHeight(6),
              borderWidth: 6,
              borderColor: 'yellow',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: responsiveScreenHeight(10),
                width: responsiveScreenHeight(10),
                borderRadius: responsiveScreenHeight(5),
                borderWidth: 4,
                borderColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(3),
                  fontWeight: '600',
                  color: 'blue',
                  lineHeight: 40,
                  fontStyle: 'italic',
                }}>
                Bt
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: responsiveScreenHeight(3),
          }}>
          <View>
            <TextInput
              label="Email"
              style={{width: responsiveScreenWidth(90)}}
              mode="outlined"
              value={text}
              onChangeText={text => setText(text)}
            />
          </View>
          <View style={{paddingTop: responsiveScreenHeight(2)}}>
            <TextInput
              label="Username"
              style={{width: responsiveScreenWidth(90)}}
              mode="outlined"
              value={username}
              onChangeText={username => setUsername(username)}
            />
          </View>
          <View style={{paddingTop: responsiveScreenHeight(2)}}>
            <TextInput
              label="First Name"
              style={{width: responsiveScreenWidth(90)}}
              mode="outlined"
              value={firstName}
              onChangeText={firstName => setFirstName(firstName)}
            />
          </View>
          <View style={{paddingTop: responsiveScreenHeight(2)}}>
            <TextInput
              label="Last Name"
              style={{width: responsiveScreenWidth(90)}}
              mode="outlined"
              value={lastName}
              onChangeText={lastName => setLastName(lastName)}
            />
          </View>
          <View style={{paddingTop: responsiveScreenHeight(2)}}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneValue}
              defaultCode="IN"
              layout="first"
              onChangeText={setPhoneValue}
              onChangeFormattedText={setFormattedPhoneValue}
              withDarkTheme
              withShadow
              containerStyle={{
                width: responsiveScreenWidth(90),
                marginBottom: 10,
                borderColor: '#grey',
                borderWidth: 1,
              }}
              textContainerStyle={{
                height: responsiveScreenHeight(8),
                // backgroundColor: 'red', // Ensure background remains white
                borderRadius: 10,
                // borderWidth:1,
                alignItems: 'center',
                borderColor: 'grey',
              }}
              textInputStyle={{
                color: 'black', // Set text color to black
                fontSize: responsiveScreenFontSize(2),
                // backgroundColor:"blue"  ,

                lineHeight: 20,
                fontWeight: '600', // Set font size to 20
              }}
            />
          </View>
          <View style={{paddingTop: responsiveScreenHeight(2)}}>
            <TextInput
              label="Address"
              mode="outlined"
              style={{
                width: responsiveScreenWidth(90),
                backgroundColor: '#fff',
              }}
              value={address}
              onChangeText={address => setAddress(address)}
            />
          </View>
        </View>
        <View
          style={{
            paddingTop: responsiveScreenHeight(2),
            paddingLeft: responsiveScreenWidth(5),
          }}>
          <TouchableOpacity
            style={{
              width: responsiveScreenWidth(60),
              padding: responsiveScreenHeight(3),
              backgroundColor: '#0C3384',
              borderRadius: responsiveScreenWidth(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveScreenFontSize(2),
                color: '#fff',
                fontWeight: '700',
                // lineHeight: 30,
              }}>
              Add Home Location
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: responsiveScreenHeight(2),
            paddingBottom: responsiveScreenHeight(5),
          }}>
          <TouchableOpacity
            style={{
              width: responsiveScreenWidth(90),
              padding: responsiveScreenHeight(3),
              backgroundColor: '#0C3384',
              borderRadius: responsiveScreenWidth(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveScreenFontSize(2),
                color: '#fff',
                fontWeight: '700',
                // lineHeight: 30,
              }}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure full-screen usage
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#0C3384',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(4),
  },
  backIcon: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(12),
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(3),
    lineHeight: 40,
    color: '#FFF',
    marginLeft: responsiveScreenWidth(5),
  },
});
export default Profile;
