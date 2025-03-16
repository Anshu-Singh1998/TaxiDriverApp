import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  BankInfoStyleheet,
  TextInput,
} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import BankInfoStyle from './BankInfoStyle';

const BankInfo = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={BankInfoStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      {/* Header */}
      <View style={BankInfoStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Left} resizeMode="contain" style={BankInfoStyle.backIcon} />
        </TouchableOpacity>
        <Text style={BankInfoStyle.headerTitle}>Bank Info</Text>
      </View>

      {/* Password Fields */}
      <View style={BankInfoStyle.passwordWrapper}>
        {[
          'Bank Name',
          'Bank Code',
          'Account Holder Name',
          'Account Number',
        ].map((placeholder, index) => (
          <View key={index} style={BankInfoStyle.passwordCell}>
            <View style={BankInfoStyle.passwordContainer}>
              <TextInput
                style={BankInfoStyle.passwordInput}
                placeholder={placeholder}
                secureTextEntry={!passwordVisible}
              />
           
            </View>
          </View>
        ))}
      </View>

      {/* Save Button Fixed at Bottom */}
      <TouchableOpacity style={BankInfoStyle.loginButton}>
        <Text style={BankInfoStyle.loginButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};


export default BankInfo;
