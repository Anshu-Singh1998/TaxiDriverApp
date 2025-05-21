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

const TermsAndConditions = () => {
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
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image source={Left} resizeMode="contain" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms And Conditions</Text>
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
                fontWeight: '700',
                fontSize: responsiveScreenFontSize(3),
                lineHeight: 40,
                color: '#000',
              }}>
              Terms Of Service
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
              Acceptance Of Terms
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
              By accessing or using Blue Taxi(“we”,”our”,or”us”) and our
              services, you agree to abide by these Terms of Service. If you do
              not agree to these terms , please refrain from using our website
              and services.
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
              Use Of Our Services
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
              You must comply with all applicable laws and regulations when
              using our services. You agree not to : Violate intellectual
              property rights.Distribute harmful software or engage in illegal
              activities.Attempt to disrupt or impair the functionality of our
              website.
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
              Privacy Policy
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
              Your use of our services is also governed by our Privacy Policy ,
              which outlines how we collect , use, and protect your personal
              information. Please review our Privacy Policy for more
              information.
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
              User Accounts
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
              When you create an account with us , you are responsible for
              maintaining its security and confidentiality. You agree to notify
              us immediately of any unauthorised access or use of your account.
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
              Termination Of Services
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
              We reserve the right to terminate or suspend your access to our
              services without prior notice if we believe you have violated
              these Terms of Service or applicable laws.
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
              Intellectual Property
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
              All content and materials on our website are protected by
              copyright , trademark, and other intellectual property rights
              owned or licensed by us.
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
              Disclaimer
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
              Our services are provided “as is” without warranties of any kind.
              We are not responsible for any damages or losses resulting from
              your use of our services.
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
              Limitation Of Liability
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
              Our liability to you is limited to the extent permitted by law .
              We are not liable for any indirect, incidental , or consequential
              damages.
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
              Contact Us
            </Text>
          </View>
          <View
            style={{
              paddingTop: responsiveScreenHeight(2),
              paddingBottom: responsiveScreenHeight(5),
            }}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: responsiveScreenFontSize(2),
                lineHeight: 20,
                color: '#000',
              }}>
              If you have any questions or concerns about our Privacy Policy or
              your data, please contact us at support@bluetaxi.in
            </Text>
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

export default TermsAndConditions;
