import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
const SplashStyle = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  GetStartedText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 36.14,
    color: '#000',
  },
  GetStartedBtn: {
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDC10F',
    borderRadius: responsiveScreenWidth(8),
  },
  GetStartedBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(10),
  },
  BlueTaxiDriverAppText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(4),
    lineHeight: 50.2,
    color: '#fff',
    textAlign: 'center',
  },
  WelcomeToText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(4),
    lineHeight: 50.2,
    color: '#fff',
    textAlign: 'center',
  },
  WelcomeAppTextView: {paddingTop: responsiveScreenHeight(4)},
  DriverLogoImg: {
    height: responsiveScreenHeight(60),
    width: responsiveScreenWidth(80),
  },
  DriverLogoImgView: {
    height: responsiveScreenHeight(30),
    width: responsiveScreenHeight(30),
    borderColor: '#fff',
    borderRadius: responsiveScreenWidth(60),
    borderWidth: responsiveScreenHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(10),
  },
});
export default SplashStyle;
