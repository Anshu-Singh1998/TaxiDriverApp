import { StyleSheet } from "react-native";
import { responsiveScreenFontSize,responsiveScreenHeight,responsiveScreenWidth } from "react-native-responsive-dimensions";
import AdditionalRideInfo from "./AdditionalRideInfo";
const AdditionalRideInfoStyle = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    input: {
      width: responsiveScreenWidth(90),
      padding: responsiveScreenHeight(2),
      // borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    dropdown: {
      width: responsiveScreenWidth(60),
      padding: responsiveScreenHeight(3),
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#000',
      paddingHorizontal: 8,
      backgroundColor: '#FFF',
    },
    placeholderStyle: {
      fontSize: 16,
      color: '#999',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#333',
    },
    button: {
      backgroundColor: '#007AFF',
      width: responsiveScreenWidth(90),
      padding: responsiveScreenHeight(2),
      alignSelf: 'center',
      borderRadius: 5,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    header: {
      height: 80,
      width: '100%',
      backgroundColor: '#0C3384',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: responsiveScreenWidth(4),
    },
    backButton: {
      paddingRight: responsiveScreenWidth(4),
    },
    backIcon: {
      height: responsiveScreenHeight(6),
      width: responsiveScreenWidth(12),
    },
    headerTitle: {
      fontWeight: '700',
      fontSize: responsiveScreenFontSize(3),
      color: '#FFF',
    },
    FormView: {
      paddingTop: responsiveScreenHeight(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  export default AdditionalRideInfoStyle