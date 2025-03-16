import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import EmergencyContacts from './EmergencyContacts';
const EmergencyContactsStyle = StyleSheet.create({
    container:{flex: 1},
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
  AddContactText: {color: 'white', fontSize: 16},
  AddContactBtn: {
    backgroundColor: '#0C3384',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  AddContactBtnView: {
    paddingLeft: responsiveScreenWidth(2),
    paddingRight: responsiveScreenWidth(2),
  },
  phoneNumber: {
    fontSize: responsiveScreenFontSize(2),
    color: '#000',
    fontWeight: '500',
  },
  phoneNumberName: {
    fontSize: responsiveScreenFontSize(2),
    color: '#000',
    fontWeight: 'bold',
  },
  NumberListView: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  NoContactsText: {textAlign: 'center', fontSize: 16},
});
export default EmergencyContactsStyle;
