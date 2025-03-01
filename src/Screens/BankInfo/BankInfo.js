import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
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

const BankInfo = () => {
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
        <Text style={styles.headerTitle}>Bank Info</Text>
      </View>

      {/* Password Fields */}
      <View style={styles.passwordWrapper}>
        {[
          'Bank Name',
          'Bank Code',
          'Account Holder Name',
          'Account Number',
        ].map((placeholder, index) => (
          <View key={index} style={styles.passwordCell}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder={placeholder}
                secureTextEntry={!passwordVisible}
              />
           
            </View>
          </View>
        ))}
      </View>

      {/* Save Button Fixed at Bottom */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Save</Text>
      </TouchableOpacity>
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

export default BankInfo;
