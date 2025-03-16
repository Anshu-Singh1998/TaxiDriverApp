import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const BankInfoStyle = StyleSheet.create({
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
    fontSize: responsiveScreenFontSize(4),
    lineHeight: 40,
    color: '#FFF',
    marginLeft: responsiveScreenWidth(5),
  },
  passwordWrapper: {
    flex: 1, // Take up remaining space
    //   justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(3),
  },
  passwordCell: {
    marginBottom: responsiveScreenHeight(2),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: responsiveScreenHeight(2),
    borderColor: '#0C3384',
    borderWidth: 1,
    borderRadius: responsiveScreenWidth(4),
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: responsiveScreenHeight(2),
  },
  loginButton: {
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C3384',
    borderRadius: responsiveScreenWidth(2),
    position: 'absolute',
    bottom: responsiveScreenHeight(3), // Ensures it's at the bottom
    alignSelf: 'center',
  },
  loginButtonText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    color: '#fff',
  },
});
export default BankInfoStyle;
