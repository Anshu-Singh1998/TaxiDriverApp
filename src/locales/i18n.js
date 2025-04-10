import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'react-native-localize';
import en from './english.json';
import hi from './hindi.json';
import armn from './armenian.json';
import ar from './arabic.json';
import bg from './bangla.json';
import ch from './chinese.json';
import jp from './japanese.json';
import tu from './turkish.json';
import ur from './urdu.json';
import du from './dutch.json';
import fr from './french.json';
import ger from './german.json';
import ind from './indonesian.json';
import kor from './korean.json';
import port from './portugese.json';
import pu from './punjabi.json';
import russ from './russian.json';
import sp from './spanish.json';
import swa from './swahili.json';
import ta from './tamil.json';
import viet from './vietnamese.json';

const resources = {
  en: {translation: en},
  hi: {translation: hi},
  armn: {translation: armn},
  ar: {translation: ar},
  bg: {translation: bg},
  ch: {translation: ch},
  jp: {translation: jp},
  tu: {translation: tu},
  ur: {translation: ur},
  du: {translation: du},
  fr: {translation: fr},
  ger: {translation: ger},
  ind: {translation: ind},
  kor: {translation: kor},
  port: {translation: port},
  pu: {translation: pu},
  russ: {translation: russ},
  sp: {translation: sp},
  swa: {translation: swa},
  ta: {translation: ta},
  viet: {translation: viet},
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => {
    const bestLang = Localization.findBestAvailableLanguage(['en', 'hi']);
    cb(bestLang?.languageTag || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
