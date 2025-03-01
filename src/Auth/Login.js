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
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation()
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
          <TextInput
            style={{
              width: responsiveScreenWidth(90),
              padding: responsiveScreenHeight(2),
              borderColor: '#0C3384',
              borderWidth: 1,
              borderRadius: responsiveScreenWidth(4),
            }}
            placeholder="Email"
          />
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
          <TextInput
            style={{
              width: responsiveScreenWidth(90),
              padding: responsiveScreenHeight(2),
              borderColor: '#0C3384',
              borderWidth: 1,
              borderRadius: responsiveScreenWidth(4),
            }}
            placeholder="Password"
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: responsiveScreenHeight(10),
          }}>
          <TouchableOpacity
          onPress={()=>navigation.navigate('DrawerNavigation')}
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
