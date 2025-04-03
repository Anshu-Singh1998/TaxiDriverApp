import {View, Text, StatusBar, Image} from 'react-native';
import * as React from 'react';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginImgSplash from '../../Assets/LoginImgSplash.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const LoginSplash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('access_token');
        console.log("Access Token====>>>",userToken) // Retrieve login token
        setTimeout(() => {
          if (userToken) {
            navigation.navigate('DrawerNavigation', {
              screen: 'Home',
            });
          } else {
            navigation.navigate('DrawerNavigation', {
              screen: 'Login',
            });
          }
        }, 3000);
      } catch (error) {
        console.error('Error checking login status:', error);
        navigation.navigate('DrawerNavigation', {
          screen: 'Login',
        });
      }
    };

    checkLoginStatus();
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
