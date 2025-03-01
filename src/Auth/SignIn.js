import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { CheckBox, Icon } from '@rneui/themed';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import DriverLogo from '../../Assets/DriverLogo.png';

const SignIn = () => {
  const [checked, setChecked] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" animated />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={DriverLogo} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Welcome Text */}
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>WELCOME</Text>
        <Text style={styles.signInText}>Sign In to Continue</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              type="feather"
              size={22}
              color="grey"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={styles.rememberForgotContainer}>
          <CheckBox
            title="Remember Me"
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={styles.checkboxContainer}
          />
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Terms & Conditions */}
        <View style={styles.termsContainer}>
          <CheckBox checked={checkedTerms} onPress={() => setCheckedTerms(!checkedTerms)} />
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.linkText}>Terms</Text> &{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Log In Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(3),
  },
  logo: {
    height: responsiveScreenHeight(15),
    width: responsiveScreenWidth(40),
  },
  textContainer: {
    paddingTop: responsiveScreenHeight(2),
    alignItems: 'center',
  },
  welcomeText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(3),
    color: '#000',
    textAlign: 'center',
  },
  signInText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    color: '#000',
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: responsiveScreenWidth(5),
    paddingTop: responsiveScreenHeight(2),
  },
  input: {
    width: '100%',
    padding: responsiveScreenHeight(2),
    borderColor: '#0C3384',
    borderWidth: 1,
    borderRadius: responsiveScreenWidth(4),
    marginBottom: responsiveScreenHeight(2),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: responsiveScreenHeight(2),
    borderColor: '#0C3384',
    borderWidth: 1,
    borderRadius: responsiveScreenWidth(4),
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: responsiveScreenHeight(2),
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(2),
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  forgotPasswordText: {
    fontWeight: '300',
    fontSize: responsiveScreenFontSize(2),
    color: '#000',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(2),
    marginLeft:responsiveScreenWidth(-2)
  },
  termsText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    color: '#000',
    marginLeft: responsiveScreenWidth(-2),
  },
  linkText: {
    color: 'blue',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(4),
  },
  loginButton: {
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C3384',
    borderRadius: responsiveScreenWidth(2),
  },
  loginButtonText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    color: '#fff',
  },
});

export default SignIn;
