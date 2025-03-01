import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Modal,
} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import RightArrow from '../../../Assets/RightArrow.png';
import Left from '../../../Assets/Left.png';
import AvailableImg from '../../../Assets/Available.png';
import LanguageImg from '../../../Assets/Language.png';
import DeleteAccountImg from '../../../Assets/DeleteAccount.png';
import ChangePasswordImg from '../../../Assets/ChangePassword.png';
import PrivacyPolicyImg from '../../../Assets/PrivacyPolicy.png';
import TermsAndConditionsImg from '../../../Assets/TermsAndConditions.png';
import AboutUsImg from '../../../Assets/AboutUs.png';
import Tick from '../../../Assets/Tick.png';
import BasicTick from '../../../Assets/BasicTick.png';
import Cross from '../../../Assets/Cross.png';

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

const Language = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const data = [
    {
      id: '1',
      lang: 'English',
      trans: 'English',
      flag: require('../../../Assets/USA.png'),
      country: 'USA',
    },
    {
      id: '2',
      lang: 'Hindi',
      trans: 'हिन्दी',
      flag: require('../../../Assets/India.jpeg'),
      country: 'India',
    },
    {
      id: '3',
      lang: 'Arabic',
      trans: 'عربي',
      flag: require('../../../Assets/UAE.jpeg'),
      country: 'UAE',
    },
    {
      id: '4',
      lang: 'Swahili',
      trans: 'kiswahili',
      flag: require('../../../Assets/Africa.png'),
      country: 'Africa',
    },
    {
      id: '5',
      lang: 'German',
      trans: 'Deutsch',
      flag: require('../../../Assets/Germany.png'),
      country: 'Germany',
    },
    {
      id: '6',
      lang: 'Portugese',
      trans: 'Português',
      flag: require('../../../Assets/Portugal.jpeg'),
      country: 'Portugal',
    },
    {
      id: '7',
      lang: 'Vietnamese',
      trans: 'tiếng việt',
      flag: require('../../../Assets/Vietnam.jpeg'),
      country: 'Vietnam',
    },
    {
      id: '8',
      lang: 'Punjabi',
      trans: 'ਪੰਜਾਬੀ',
      flag: require('../../../Assets/India.jpeg'),
      country: 'India',
    },
    {
      id: '9',
      lang: 'Urdu',
      trans: 'اردو',
      flag: require('../../../Assets/Pakistan.png'),
      country: 'Pakistan',
    },
    {
      id: '10',
      lang: 'Chinese',
      trans: '中國人',
      flag: require('../../../Assets/China.png'),
      country: 'China',
    },
    {
      id: '11',
      lang: 'Japanese',
      trans: '日本語',
      flag: require('../../../Assets/Japan.png'),
      country: 'Japan',
    },
    {
      id: '12',
      lang: 'Spanish',
      trans: 'española',
      flag: require('../../../Assets/Spain.png'),
      country: 'Spain',
    },
    {
      id: '13',
      lang: 'French',
      trans: 'frans',
      flag: require('../../../Assets/France.png'),
      country: 'France',
    },
    {
      id: '14',
      lang: 'Indonesian',
      trans: 'Indonesia',
      flag: require('../../../Assets/Indonesia.png'),
      country: 'Indonesia',
    },
    {
      id: '15',
      lang: 'Turkish',
      trans: 'Türkçe',
      flag: require('../../../Assets/Turkey.png'),
      country: 'Turkey',
    },
    {
      id: '16',
      lang: 'Dutch',
      trans: 'Nederlands',
      flag: require('../../../Assets/Netherlands.jpeg'),
      country: 'Netherlands',
    },
    {
      id: '17',
      lang: 'Tamil',
      trans: 'தமிழ்',
      flag: require('../../../Assets/India.jpeg'),
      country: 'India',
    },
    {
      id: '18',
      lang: 'Russian',
      trans: 'русский',
      flag: require('../../../Assets/Russia.png'),
      country: 'Russia',
    },
    {
      id: '19',
      lang: 'Korean',
      trans: '한국인',
      flag: require('../../../Assets/Korea.jpeg'),
      country: 'Korea',
    },
    {
      id: '20',
      lang: 'Bangla',
      trans: 'বাংলা',
      flag: require('../../../Assets/Bangladesh.png'),
      country: 'Bangladesh',
    },
    {
      id: '21',
      lang: 'Armenian',
      trans: 'Հայաստան',
      flag: require('../../../Assets/Armenia.png'),
      country: 'Armenia',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Left} resizeMode="contain" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: responsiveScreenHeight(3),
          paddingBottom: responsiveScreenHeight(8),
        }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            const isSelected = item.id === selectedId;
            return (
              <View style={{paddingBottom: responsiveScreenHeight(2)}}>
                <TouchableOpacity onPress={() => setSelectedId(item.id)}>
                  <View
                    style={{
                      width: responsiveScreenWidth(90),
                      padding: responsiveScreenHeight(2),
                      backgroundColor: isSelected ? '#9fc1f5' : '#fff',
                      borderRadius: responsiveScreenWidth(3),
                      flexDirection: 'row',
                      justifyContent: isSelected ?'space-between': null,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: responsiveScreenHeight(8),
                        height: responsiveScreenHeight(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isSelected ? '#d4fcdf' : '#fff',
                        borderRadius: responsiveScreenWidth(8),
                      }}>
                      <Image
                        source={item.flag}
                        style={{
                          height: responsiveScreenHeight(5),
                          width: responsiveScreenWidth(8),
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      style={{
                        paddingLeft: responsiveScreenHeight(3),
                      }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: responsiveScreenFontSize(3),
                          lineHeight: 30,
                          color: '#000',
                        }}>
                        {item.lang}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: responsiveScreenFontSize(2),
                          lineHeight: 30,
                          color: '#000',
                        }}>
                        {item.trans}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: responsiveScreenFontSize(2),
                          lineHeight: 20,
                          color: '#000',
                        }}>
                        {item.country}
                      </Text>
                    </View>
                    {isSelected ? (
                      <View>
                        <Image
                          source={Tick}
                          style={{
                            height: responsiveScreenHeight(5),
                            width: responsiveScreenWidth(7),
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
});
export default Language;
