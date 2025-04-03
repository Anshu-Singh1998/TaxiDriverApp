import {View, Text, SplashStyleheet, Image, TouchableOpacity} from 'react-native';
import * as React from 'react';
import {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DriverLogo from '../../Assets/DriverLogo.png';
import SplashStyle from './SplashStyle';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#4581FF', '#0C3384']}
      style={SplashStyle.linearGradient}>
      <View style={SplashStyle.container}>
        <View style={SplashStyle.DriverLogoImgView}>
          <Image
            source={DriverLogo}
            style={SplashStyle.DriverLogoImg}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={SplashStyle.WelcomeAppTextView}>
        <Text style={SplashStyle.WelcomeToText}>Welcome To</Text>
        <Text style={SplashStyle.BlueTaxiDriverAppText}>Blue Taxi Driver App</Text>
      </View>
      <View style={SplashStyle.GetStartedBtnView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Auth')}
          style={SplashStyle.GetStartedBtn}>
          <Text style={SplashStyle.GetStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Splash;
