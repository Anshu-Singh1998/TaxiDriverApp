import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Left from '../../../Assets/Left.png';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProfileData,
  updateProfileData,
  clearProfileMessages,
} from '../../redux/Slices/RecieveProfileSlice';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [formattedPhoneValue, setFormattedPhoneValue] = useState('');
  const phoneInput = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    data,
    fetchLoading,
    updateLoading,
    fetchError,
    updateError,
    successMessage,
  } = useSelector(state => state.profile);
  console.log('Datat=====>>>>', data);
  // Load profile data initially
  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  // Populate input fields when data is fetched
  useEffect(() => {
    if (data) {
      setEmail(data.data.old_email || '');
      setUsername(data.data.username || '');
      setFirstName(data.data.first_name || '');
      setLastName(data.data.last_name || '');
      setAddress(data.data.address || '');
      setPhoneValue(data.data.phone || '');
      setFormattedPhoneValue(data.data.phone || '');
    }
  }, [data]);

  // Show update success message
  useEffect(() => {
    if (successMessage) {
      Alert.alert('Success', successMessage);
      dispatch(clearProfileMessages());
    }
  }, [successMessage]);

  // Show update error message
  useEffect(() => {
    if (updateError) {
      Alert.alert('Update Failed', updateError);
      dispatch(clearProfileMessages());
    }
  }, [updateError]);

  const handleUpdateProfile = () => {
    if (
      !email ||
      !username ||
      !firstName ||
      !lastName ||
      !address 
     
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const updatedData = {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      address,
      phone: formattedPhoneValue,
    };
    dispatch(updateProfileData(updatedData));
  };

  return (
    <View style={styles.MainContainer}>
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
      {fetchLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0C3384" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.circleView}>
            <View style={styles.BtTextYellowView}>
              <View style={styles.BtTextBlueView}>
                <Text style={styles.BtText}>Bt</Text>
              </View>
            </View>
          </View>
          <View style={styles.formView}>
            <View>
              <TextInput
                label="Email"
                style={styles.input}
                mode="outlined"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.UserInputView}>
              <TextInput
                label="Username"
                style={styles.input}
                mode="outlined"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.FirstNameInputView}>
              <TextInput
                label="First Name"
                style={styles.input}
                mode="outlined"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.lastNameInputView}>
              <TextInput
                label="Last Name"
                style={styles.input}
                mode="outlined"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View style={styles.phoneInputView}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneValue}
                defaultCode="IN"
                layout="first"
                onChangeText={setPhoneValue}
                onChangeFormattedText={setFormattedPhoneValue}
                withDarkTheme
                withShadow
                containerStyle={styles.PhoneInputContainer}
                textContainerStyle={styles.containerStyleView}
                textInputStyle={styles.inputStyle}
              />
            </View>
            <View style={styles.AddressInputView}>
              <TextInput
                label="Address"
                mode="outlined"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
          <View style={styles.AddHomeLocationBtnView}>
            <TouchableOpacity style={styles.AddHomeLocationBtn}>
              <Text style={styles.AddHomeLocationText}>Add Home Location</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.updateProfileBtnView}>
            <TouchableOpacity
              style={styles.updateProfileBtn}
              onPress={handleUpdateProfile}>
              {updateLoading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.AddHomeLocationText}>Update Profile</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  updateProfileText: {
    fontSize: responsiveScreenFontSize(2),
    color: '#fff',
    fontWeight: '700',
    // lineHeight: 30,
  },
  updateProfileBtn: {
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(3),
    backgroundColor: '#0C3384',
    borderRadius: responsiveScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateProfileBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(2),
    paddingBottom: responsiveScreenHeight(5),
  },
  AddHomeLocationText: {
    fontSize: responsiveScreenFontSize(2),
    color: '#fff',
    fontWeight: '700',
    // lineHeight: 30,
  },
  AddHomeLocationBtn: {
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(3),
    backgroundColor: '#0C3384',
    borderRadius: responsiveScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddHomeLocationBtnView: {
    paddingTop: responsiveScreenHeight(2),
    paddingLeft: responsiveScreenWidth(5),
  },
  input: {
    width: responsiveScreenWidth(90),
    backgroundColor: '#fff',
  },
  AddressInputView: {paddingTop: responsiveScreenHeight(2)},
  inputStyle: {
    color: 'black', // Set text color to black
    fontSize: responsiveScreenFontSize(2),
    // backgroundColor:"blue"  ,

    lineHeight: 20,
    fontWeight: '600', // Set font size to 20
  },
  containerStyleView: {
    height: responsiveScreenHeight(8),
    // backgroundColor: 'red', // Ensure background remains white
    borderRadius: 10,
    // borderWidth:1,
    alignItems: 'center',
    borderColor: 'grey',
  },
  PhoneInputContainer: {
    width: responsiveScreenWidth(90),
    marginBottom: 10,
    borderColor: '#grey',
    borderWidth: 1,
  },
  phoneInputView: {paddingTop: responsiveScreenHeight(2)},
  lastNameInputView: {paddingTop: responsiveScreenHeight(2)},
  FirstNameInputView: {paddingTop: responsiveScreenHeight(2)},
  UserInputView: {paddingTop: responsiveScreenHeight(2)},
  formView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(3),
  },
  BtText: {
    fontSize: responsiveScreenFontSize(3),
    fontWeight: '600',
    color: 'blue',
    lineHeight: 40,
    fontStyle: 'italic',
  },
  BtTextBlueView: {
    height: responsiveScreenHeight(10),
    width: responsiveScreenHeight(10),
    borderRadius: responsiveScreenHeight(5),
    borderWidth: 4,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtTextYellowView: {
    height: responsiveScreenHeight(12),
    width: responsiveScreenHeight(12),
    borderRadius: responsiveScreenHeight(6),
    borderWidth: 6,
    borderColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(3),
  },
  MainContainer: {flex: 1},
});
export default Profile;
