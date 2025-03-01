import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import Left from '../../../Assets/Left.png';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';

const DeleteAccount = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Left} resizeMode="contain" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delete Account</Text>
      </View>
      <ScrollView>
        <View
          style={{
            paddingLeft: responsiveScreenWidth(5),
            paddingRight: responsiveScreenWidth(5),
          }}>
          <View style={{paddingTop: responsiveScreenHeight(2)}}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: responsiveScreenFontSize(2),
                lineHeight: 40,
                color: '#000',
              }}>
              Are You sure you want to delete your account? Please read how
              account deletion will affect.
            </Text>
          </View>
          <View style={{paddingTop: responsiveScreenHeight(2)}}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: responsiveScreenFontSize(3),
                lineHeight: 30,
                color: '#000',
              }}>
              Account
            </Text>
          </View>
          <View style={{paddingTop: responsiveScreenHeight(2)}}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: responsiveScreenFontSize(2),
                lineHeight: 20,
                color: '#000',
              }}>
              Deleting your account remove personal information from our
              database. Your email becomes permanently reserved and same email
              cannot be re-used to register a new account.
            </Text>
          </View>
          <View
            style={{
              paddingTop: responsiveScreenHeight(3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: responsiveScreenWidth(60),
                padding: responsiveScreenHeight(2),
                borderRadius: responsiveScreenWidth(2),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f55d5d',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="delete" type="feather" size={22} color="#fff" />
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: responsiveScreenFontSize(3),
                    lineHeight: 30,
                    color: '#fff',
                    paddingLeft: responsiveScreenWidth(2),
                  }}>
                  Delete Account
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default DeleteAccount;
