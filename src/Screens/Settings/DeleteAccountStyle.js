import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import DeleteAccount from './DeleteAccount';
const DeleteAccountStyle = StyleSheet.create({
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
  DeleteAccountText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(3),
    lineHeight: 30,
    color: '#fff',
    paddingLeft: responsiveScreenWidth(2),
  },
  DeleteAccountBtnRow: {flexDirection: 'row', alignItems: 'center'},
  DeleteAccountBtn: {
    width: responsiveScreenWidth(60),
    padding: responsiveScreenHeight(2),
    borderRadius: responsiveScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f55d5d',
  },
  DeleteAccountView: {
    paddingTop: responsiveScreenHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  DeleteDetails: {
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 20,
    color: '#000',
  },
  DeleteDetailsView: {paddingTop: responsiveScreenHeight(2)},
  AccountText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(3),
    lineHeight: 30,
    color: '#000',
  },
  AccountTextView: {paddingTop: responsiveScreenHeight(2)},
  DeleteConfirmationText: {
    fontWeight: '500',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 40,
    color: '#000',
  },
  DeleteConfirmationTextView: {paddingTop: responsiveScreenHeight(2)},
  SpacingView: {
    paddingLeft: responsiveScreenWidth(5),
    paddingRight: responsiveScreenWidth(5),
  },
});
export default DeleteAccountStyle;
