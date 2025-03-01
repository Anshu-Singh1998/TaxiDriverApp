import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as React from 'react';
import {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DriverLogo from '../../Assets/DriverLogo.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();


  return (
    <LinearGradient
      colors={['#4581FF', '#0C3384']}
      style={styles.linearGradient}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: responsiveScreenHeight(10),
        }}>
        <View
          style={{
            height: responsiveScreenHeight(30),
            width: responsiveScreenHeight(30),
            borderColor: '#fff',
            borderRadius: responsiveScreenWidth(60),
            borderWidth: responsiveScreenHeight(3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={DriverLogo}
            style={{
              height: responsiveScreenHeight(60),
              width: responsiveScreenWidth(80),
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={{paddingTop: responsiveScreenHeight(4)}}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: responsiveScreenFontSize(4),
            lineHeight: 50.2,
            color: '#fff',
            textAlign: 'center',
          }}>
          Welcome To
        </Text>
        <Text
          style={{
            fontWeight: '700',
            fontSize: responsiveScreenFontSize(4),
            lineHeight: 50.2,
            color: '#fff',
            textAlign: 'center',
          }}>
          Blue Taxi Driver App
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: responsiveScreenHeight(10),
        }}>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Auth')}
          style={{
            width: responsiveScreenWidth(60),
            padding: responsiveScreenHeight(2),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FDC10F',
            borderRadius: responsiveScreenWidth(8),
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: responsiveScreenFontSize(2),
              lineHeight: 36.14,
              color: '#000',
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
export default Splash;
