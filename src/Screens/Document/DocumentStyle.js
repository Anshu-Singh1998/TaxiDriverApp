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
    padding: 10,
    borderRadius: 5,
  },
  MainContainer: {flex: 1},
});
export default DocumentStyle;
