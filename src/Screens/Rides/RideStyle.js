import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';


const RideStyle = StyleSheet.create({
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
  PrintBillText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 36,
    color: '#fff',
  },
  PrintBillTextView: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(4),
    borderRadius: responsiveScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#04B725',
    backgroundColor: '#a95bfc',
  },
  PrintBillView: {right: -10},
  TollMoneyText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 36,
    color: '#fff',
  },
  TollMoneyTextView: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(4),
    borderRadius: responsiveScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cca3f7',
    // backgroundColor: '#FF0000',
  },
  TollMoneyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  FinishTripText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 36,
    color: '#fff',
  },
  FinishTripTextView: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(4),
    borderRadius: responsiveScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FF0000',
    backgroundColor: '#3242ab',
  },
  FinishTripView: {right: -10},
  FinishedText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 36,
    color: '#fff',
  },
  FinishedTextView: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenHeight(4),
    borderRadius: responsiveScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#04B725',
    backgroundColor: '#5894f5',
  },
  FinishedView: {
    flexDirection: 'row',

    paddingBottom: responsiveScreenHeight(2),
  },
  ArrivalStatusRowView: {paddingTop: responsiveScreenHeight(4)},
  ArrivalStatusText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 36,
    color: '#000',
  },
  ArrivalStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TripTypeText: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 36,
    color: '#000',
  },
  RideBox: {
    borderWidth: 1,
    borderColor: '#000',
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
  },
  RideBoxView: {
    paddingTop: responsiveScreenHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {flex: 1},
});
export default RideStyle;
