import {
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../redux/Slices/LoginSlices';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading, error, user} = useSelector(state => state.login);

  const handleLogin = () => {
    console.log('Button is being pressed', email, password);
    dispatch(loginUser({email, password})).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Home');
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        animated={true}
      />
      <View style={{paddingTop: responsiveScreenHeight(20)}}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: responsiveScreenFontSize(5),
            lineHeight: 64.25,
            color: '#0C3384',
            textAlign: 'center',
          }}>
          Login
        </Text>
      </View>
      <View
        style={{
          paddingLeft: responsiveScreenWidth(5),
          paddingRight: responsiveScreenWidth(5),
          paddingTop: responsiveScreenHeight(2),
        }}>
        <View>
          <Text
            style={{
              fontWeight: '700',
              fontSize: responsiveScreenFontSize(3),
              lineHeight: 36.14,
              color: '#000',
            }}>
            Email
          </Text>
        </View>
        <View style={{paddingTop: responsiveScreenHeight(2)}}>
          <View
            style={{
              width: responsiveScreenWidth(90),
              borderColor: '#0C3384',
              borderWidth: 1,
              borderRadius: responsiveScreenWidth(4),
              backgroundColor: '#fff',
              overflow: 'hidden',
            }}>
            <TextInput
              style={{
                padding: responsiveScreenHeight(2),
                fontSize: responsiveScreenFontSize(2),
                color: '#000',
                backgroundColor: 'transparent',
              }}
              placeholder="Email"
              placeholderTextColor="#000"
              value={email}
              onChangeText={setEmail}
              autoComplete="email"
              textContentType="emailAddress"
              importantForAutofill="yes"
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: '700',
              fontSize: responsiveScreenFontSize(3),
              lineHeight: 36.14,
              color: '#000',
              paddingTop: responsiveScreenHeight(2),
            }}>
            Password
          </Text>
        </View>
        <View style={{paddingTop: responsiveScreenHeight(2)}}>
          <View
            style={{
              width: responsiveScreenWidth(90),
              borderColor: '#0C3384',
              borderWidth: 1,
              borderRadius: responsiveScreenWidth(4),
              backgroundColor: '#fff', 
              overflow: 'hidden', 
            }}>
            <TextInput
              style={{
                padding: responsiveScreenHeight(2),
                fontSize: responsiveScreenFontSize(2),
                color: '#000',
                backgroundColor: 'transparent', 
              }}
              placeholder="Password"
              placeholderTextColor="#000"
              value={password}
              onChangeText={setPassword}
              autoComplete="password"
              textContentType="Password"
              importantForAutofill="yes"
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: responsiveScreenHeight(10),
          }}>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              width: responsiveScreenWidth(60),
              padding: responsiveScreenHeight(2),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0C3384',
              borderRadius: responsiveScreenWidth(8),
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: responsiveScreenFontSize(2),
                lineHeight: 36.14,
                color: '#fff',
              }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
