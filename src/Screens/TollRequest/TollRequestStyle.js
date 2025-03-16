import { StyleSheet } from "react-native";
import { responsiveScreenFontSize,responsiveScreenHeight,responsiveScreenWidth } from "react-native-responsive-dimensions";
const TollRequestStyle = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 50,
    },
    switchContainer: {
      width: 400,
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      position: 'relative',
    },
    slider: {
      position: 'absolute',
      width: '50%',
      height: '100%',
      backgroundColor: '#0A2C7D',
      borderRadius: 25,
    },
    option: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#0A2C7D',
    },
    selectedText: {
      color: '#fff',
    },
    step: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    textSteps: {
      fontSize: 14,
      color: '#333',
    },
    line: {
      marginLeft: 9, // Align with icons
    },
    dash: {
      width: responsiveScreenWidth(1), // Vertical Line
      height: 100, // Adjust height
      flexDirection: 'column', // For vertical alignment
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
    RequestBtnText: {
      fontWeight: '700',
      fontSize: responsiveScreenFontSize(2),
      lineHeight: 36.14,
      color: '#fff',
    },
    RequestBtn: {
      width: responsiveScreenWidth(80),
      padding: responsiveScreenHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0C3384',
      borderRadius: responsiveScreenWidth(4),
    },
    RequestBtnView: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: responsiveScreenHeight(2),
    },
    CameraImgIcon: {
      width: responsiveScreenWidth(10),
      height: responsiveScreenWidth(10),
    },
    CameraImgIconView: {
      width: responsiveScreenWidth(20),
      height: responsiveScreenWidth(20),
      borderRadius: responsiveScreenWidth(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
    },
    AmountInput: {
      borderWidth: 1,
      borderColor: 'grey',
      width: responsiveScreenWidth(60),
      color: '#000',
      borderRadius: responsiveScreenWidth(1),
      fontSize: responsiveScreenFontSize(2),
      padding: responsiveScreenWidth(6),
    },
    InputCamera: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    DestinationImg: {
      height: responsiveScreenHeight(4),
      width: responsiveScreenWidth(7),
    },
    line: {
      width: responsiveScreenWidth(1),
      height: responsiveScreenHeight(4),
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: '#0C3384',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CompassIcon: {
      height: responsiveScreenHeight(4),
      width: responsiveScreenWidth(7),
    },
    lineView: {paddingLeft: responsiveScreenWidth(3)},
    StepView: {paddingTop: responsiveScreenHeight(3)},
    RideId: {
      fontWeight: '700',
      fontSize: responsiveScreenFontSize(2),
      lineHeight: 40,
      color: '#000',
    },
    TimeText: {
      fontWeight: '700',
      fontSize: responsiveScreenFontSize(2),
      lineHeight: 40,
      color: '#000',
    },
    AtText: {
      fontWeight: '700',
      fontSize: responsiveScreenFontSize(2),
      lineHeight: 40,
      color: '#000',
    },
    AtSpaceView: {
      paddingLeft: responsiveScreenWidth(0.5),
      paddingRight: responsiveScreenWidth(0.5),
    },
    DateText: {
      fontWeight: '700',
      fontSize: responsiveScreenFontSize(2),
      lineHeight: 40,
      color: '#000',
    },
    CalenderImg: {
      height: responsiveScreenHeight(4),
      width: responsiveScreenWidth(10),
    },
    CalenderImgRow: {flexDirection: 'row'},
    RowViewSpace: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
    },
    BorderLine: {
      borderWidth: 1,
      borderColor: 'grey',
      width: responsiveScreenWidth(90),
      padding: responsiveScreenHeight(2),
      borderRadius: responsiveScreenWidth(4),
    },
    ListRowView: {
      paddingTop: responsiveScreenHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    SpacingValue: {
      paddingLeft: responsiveScreenWidth(5),
      paddingRight: responsiveScreenWidth(5),
      paddingTop: responsiveScreenHeight(1),
      paddingBottom: responsiveScreenHeight(15),
    },
    MainContainer: {flex: 1},
  });
  export default TollRequestStyle