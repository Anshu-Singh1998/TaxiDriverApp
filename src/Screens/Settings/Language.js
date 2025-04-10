import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import Tick from '../../../Assets/Tick.png';

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import LanguageStyle from './LanguageStyle';
import {useTranslation} from 'react-i18next';

const Language = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(i18n.language);
  const {t, i18n} = useTranslation();
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

  const handleLanguageSelect = langId => {
    setSelectedId(langId);
    i18n.changeLanguage(langId);
    // Optionally: Persist selection using AsyncStorage
  };

  return (
    <View style={LanguageStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      <View style={LanguageStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Left}
            resizeMode="contain"
            style={LanguageStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={LanguageStyle.headerTitle}>Language</Text>
      </View>
      <View style={LanguageStyle.ContainerView}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            const isSelected = item.id === selectedId;
            return (
              <View style={LanguageStyle.ListViewSpace}>
                <TouchableOpacity onPress={() => handleLanguageSelect(item.id)}>
                  <View
                    style={[
                      LanguageStyle.CountryView,
                      {
                        backgroundColor: isSelected ? '#9fc1f5' : '#fff',

                        justifyContent: isSelected ? 'space-between' : null,
                      },
                    ]}>
                    <View
                      style={[
                        LanguageStyle.CountryFlagImgView,
                        {backgroundColor: isSelected ? '#d4fcdf' : '#fff'},
                      ]}>
                      <Image
                        source={item.flag}
                        style={LanguageStyle.CountryFlagImg}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={LanguageStyle.TextView}>
                      <Text style={LanguageStyle.LanguageText}>
                        {item.lang}
                      </Text>
                      <Text style={LanguageStyle.TranslationText}>
                        {item.trans}
                      </Text>
                      <Text style={LanguageStyle.CountryText}>
                        {item.country}
                      </Text>
                    </View>
                    {isSelected ? (
                      <View>
                        <Image
                          source={Tick}
                          style={LanguageStyle.TickImg}
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

export default Language;
