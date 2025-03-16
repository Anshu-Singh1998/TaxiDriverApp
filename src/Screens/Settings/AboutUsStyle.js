import { StyleSheet } from "react-native";
import { responsiveScreenFontSize,responsiveScreenHeight,responsiveScreenWidth } from "react-native-responsive-dimensions";

const AboutUsStyle = StyleSheet.create({
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
    FollowText: {
      fontWeight: '700',
      fontSize: responsiveScreenFontSize(3),
      lineHeight: 40,
      color: '#000',
    },
    FollowTextView: {
      paddingTop: responsiveScreenHeight(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    VersionValueText: {
      fontWeight: '400',
      fontSize: responsiveScreenFontSize(3),
      lineHeight: 40,
      color: '#000',
    },
    VersionView: {
      paddingTop: responsiveScreenHeight(0.5),
      justifyContent: 'center',
      alignItems: 'center',
    },
    AppNameText: {
      fontWeight: '600',
      fontSize: responsiveScreenFontSize(3),
      lineHeight: 40,
      color: '#000',
    },
    AppNameView: {
      paddingTop: responsiveScreenHeight(0.5),
      justifyContent: 'center',
      alignItems: 'center',
    },
    DriverLogoImg: {
      height: responsiveScreenHeight(30),
      width: responsiveScreenHeight(30),
    },
    DriverLogoView: {justifyContent: 'center', alignItems: 'center'},
    Spacio: {
      paddingLeft: responsiveScreenWidth(5),
      paddingRight: responsiveScreenWidth(5),
    },
  });
  export default AboutUsStyle