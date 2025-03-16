import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
const LanguageStyle = StyleSheet.create({
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
  TickImg: {
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(7),
  },
  CountryText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 20,
    color: '#000',
  },
  TranslationText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(2),
    lineHeight: 30,
    color: '#000',
  },
  LanguageText: {
    fontWeight: '700',
    fontSize: responsiveScreenFontSize(3),
    lineHeight: 30,
    color: '#000',
  },
  TextView: {
    paddingLeft: responsiveScreenHeight(3),
  },
  CountryFlagImg: {
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(8),
  },
  CountryFlagImgView: {
    width: responsiveScreenHeight(8),
    height: responsiveScreenHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
  
    borderRadius: responsiveScreenWidth(8),
  },
  CountryView: {
    width: responsiveScreenWidth(90),
    padding: responsiveScreenHeight(2),
   
    borderRadius: responsiveScreenWidth(3),
    flexDirection: 'row',
    
    alignItems: 'center',
  },
  ListViewSpace: {paddingBottom: responsiveScreenHeight(2)},
  ContainerView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveScreenHeight(3),
    paddingBottom: responsiveScreenHeight(8),
  },
  container: {flex: 1},
});
export default LanguageStyle;
