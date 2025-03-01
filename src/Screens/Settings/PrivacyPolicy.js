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

const PrivacyPolicy = () => {
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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
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
              Privacy Policy
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
              Introduction
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
              Welcome to Blue Taxi] (“we”,”our”, or “us”).We are committed to
              protecting your privacy and ensuring the security of your personal
              information . This Privacy Policy outlines our practices
              concerning the collection , use, and disclosure of personal data
              when you visit our website or use our services.
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
              Information We Collect
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
              We may collect various types of information , including but not
              limited to: Personal Information: Name , email address, phone
              number, and other identifiable details when you provide them
              voluntarily, such as when you contact us or make a booking.Usage
              Information: Data on how you interact with our website , including
              pages viewed, links clicked and other browsing activity. Device
              Information: Information about the device you use to access our
              website , including IP address, browser type , and operating
              system.Location Information: We may collect your approximate
              location based on your IP address.
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
              How We Use Your Information
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
              We use the collected information for various purposes, including
              but not limited to : Providing and improving our services.
              Personalising your experiences . Sending transactional emails and
              updates. Analysing website usage and trends. Complying with legal
              obligations.
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
              Cookies and Similar Technologies
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
              We may use cookies and similar technologies to enhance your
              experience on our website . You can manage cookies preferences
              through your browser settings.
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
              Data Sharing
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
              We may share your information with trusted third parties who
              assist us in delivering our services. We will not sell your
              personal information to third parties.
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
              Security Measures
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
              We implement security measures to protect your data . However, no
              method of transmission or storage in entirely secure; we cannot
              guarantee absolute security.
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
              Your Choices
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
              You have the right to access , update , or delete your personal
              information. I f you wish to exercise these rights, please contact
              us using the information provided below.
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
              Changes To This Policy
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
              We may update this Privacy Policy to reflect changes in our
              practices or legal requirements . We encourage you to review this
              page periodically for updates.
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
          <View style={{paddingTop: responsiveScreenHeight(2),paddingBottom:responsiveScreenHeight(5)}}>
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
    fontSize: responsiveScreenFontSize(4),
    lineHeight: 40,
    color: '#FFF',
    marginLeft: responsiveScreenWidth(5),
  },
});

export default PrivacyPolicy;
