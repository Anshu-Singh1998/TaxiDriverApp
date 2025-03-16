import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
const RideDetailStyle = StyleSheet.create({
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
  CashCollectedText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 36.14,
    color: '#fff',
  },
  CashCollectedBtn: {
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C3384',
    borderRadius: responsiveScreenWidth(4),
  },
  CashCollectedBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(2),
  },
  TotalValueText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: 'green',
  },
  TotalText: {
    fontWeight: '500',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: 'green',
  },
  TotalRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AdditionalChargesValueText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  AdditionalChargesText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  AdditionalChargesRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  RideChargesValueText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  RideChargesText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  RideChargesRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  PriceDetailsText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  PriceDetailsBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: responsiveScreenHeight(2),
  },
  AmountBox: {
    borderWidth: 1,
    borderColor: 'grey',
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
    borderRadius: responsiveScreenWidth(4),
  },
  AmountBoxSpacing: {
    paddingTop: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  AmountBoxSpacingView: {paddingBottom: responsiveScreenHeight(1)},
  StatusValueText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  StatusText: {
    fontWeight: '500',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  StatusRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CashText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  ViaText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  PaymentValueText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(2),
  },
  PaymentDetailsText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  PaymentDetailsBox: {
    borderWidth: 1,
    borderColor: 'grey',
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
    borderRadius: responsiveScreenWidth(4),
  },
  PaymentDetailsBoxSpace: {
    paddingTop: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  PaymentDetailsBoxSpaceView: {paddingBottom: responsiveScreenHeight(1)},
  RightArrowIcon: {
    height: responsiveScreenHeight(2),
    width: responsiveScreenWidth(5),
    tintColor: 'grey',
  },
  ViewHistoryText: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  ViewHistoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(2),
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
  lineView: {paddingLeft: responsiveScreenWidth(3)},
  CompassImg: {
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(7),
  },
  stepper: {paddingTop: responsiveScreenHeight(3)},
  DistanceValueText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
    paddingLeft: responsiveScreenWidth(2),
  },
  DistanceText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  DistanceRow: {flexDirection: 'row'},
  DistanceRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  RideText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  RideTextView: {paddingLeft: responsiveScreenWidth(2)},
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
  AtTextView: {
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
  CalenderDateTime: {flexDirection: 'row'},
  CalenderDateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  RideDetailBox: {
    borderWidth: 1,
    borderColor: 'grey',
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
    borderRadius: responsiveScreenWidth(4),
  },
  RideDetailsRowView: {
    paddingTop: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  RideDetailsRowViewSpace: {paddingBottom: responsiveScreenHeight(1)},
  Spacio: {
    paddingLeft: responsiveScreenWidth(5),
    paddingRight: responsiveScreenWidth(5),
    paddingTop: responsiveScreenHeight(1),
    paddingBottom: responsiveScreenHeight(15),
  },
  MainContainer: {flex: 1},
});
export default RideDetailStyle;
