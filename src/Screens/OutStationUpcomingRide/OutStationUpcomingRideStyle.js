import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const OutStationUpcomingRideStyle = StyleSheet.create({
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
    color: '#000',
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
  StartBtnText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 36.14,
    color: '#fff',
  },
  StartBtn: {
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C3384',
    borderRadius: responsiveScreenWidth(8),
  },
  StartBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(6),
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
  CompassText: {
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(7),
  },
  lineView: {paddingLeft: responsiveScreenWidth(3)},
  CompassView: {paddingTop: responsiveScreenHeight(3)},
  RideId: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  CalenderTimeText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  CalenderAtText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  CalenderAtTextView: {
    paddingLeft: responsiveScreenWidth(0.5),
    paddingRight: responsiveScreenWidth(0.5),
  },
  CalenderDateText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  CalenderImg: {
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(10),
  },
  DateTimeRow: {flexDirection: 'row'},
  BottomBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  RideInfoView: {
    borderWidth: 1,
    borderColor: '#000',
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
    borderRadius: responsiveScreenWidth(4),
  },
  RideInfoViewMain: {
    paddingTop: responsiveScreenHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ToggleArea: {
    paddingTop: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  OutStationUpcomingRideText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(3),
    lineHeight: 40,
    color: '#FFF',
  },
  OutStationUpcomingRideTextView: {
    justifyContent: 'center',
    paddingLeft: responsiveScreenWidth(4),
    paddingTop: responsiveScreenHeight(1),
  },
  LeftImg: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(12),
  },
  LeftView: {
    justifyContent: 'center',
    paddingLeft: responsiveScreenWidth(4),
    paddingTop: responsiveScreenHeight(1),
  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#0C3384',
    flexDirection: 'row',
  },
  MainContainerView: {flex: 1},
});
export default OutStationUpcomingRideStyle;
