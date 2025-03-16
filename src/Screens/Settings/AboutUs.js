import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import * as React from 'react';
import Left from '../../../Assets/Left.png';
import {useNavigation} from '@react-navigation/native';
import DriverLogo from '../../../Assets/DriverLogo.png';
import AboutUsStyle from './AboutUsStyle';

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <View style={AboutUsStyle.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0C3384"
        animated={true}
      />
      {/* Header */}
      <View style={AboutUsStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Left}
            resizeMode="contain"
            style={AboutUsStyle.backIcon}
          />
        </TouchableOpacity>
        <Text style={AboutUsStyle.headerTitle}>About Us</Text>
      </View>
      <ScrollView>
        <View style={AboutUsStyle.Spacio}>
          <View style={AboutUsStyle.DriverLogoView}>
            <Image
              source={DriverLogo}
              style={AboutUsStyle.DriverLogoImg}
              resizeMode="contain"
            />
          </View>
          <View style={AboutUsStyle.AppNameView}>
            <Text style={AboutUsStyle.AppNameText}>Blue Taxi Driver</Text>
          </View>
          <View style={AboutUsStyle.VersionView}>
            <Text style={AboutUsStyle.VersionValueText}>v1.0</Text>
          </View>
          <View style={AboutUsStyle.FollowTextView}>
            <Text style={AboutUsStyle.FollowText}>Follow Us</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUs;
