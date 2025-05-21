import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
const DocumentStyle = StyleSheet.create({
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: responsiveScreenHeight(2),
    borderRadius: 5,
    width: responsiveScreenWidth(80),
    color: '#000',
    fontSize: responsiveScreenFontSize(2),
    fontWeight: '400',
  },
  MainContainer: {flex: 1},
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width: responsiveScreenWidth(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItemText: {
    color: '#000',
    fontSize: responsiveScreenFontSize(2),
    fontWeight: '400',
  },
});
export default DocumentStyle;
