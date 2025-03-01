import {View, Text, StatusBar, Image} from 'react-native';
import * as React from 'react';
import {useEffect} from 'react';
import LoginImgSplash from '../../Assets/LoginImgSplash.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const LoginSplash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 5000);
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        animated={true}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: responsiveScreenHeight(30),
        }}>
        <Image
          source={LoginImgSplash}
          style={{
            height: responsiveScreenHeight(20),
            width: responsiveScreenWidth(60),
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default LoginSplash;
