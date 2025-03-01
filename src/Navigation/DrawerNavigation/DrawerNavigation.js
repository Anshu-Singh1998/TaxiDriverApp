import * as React from 'react';
import { useState } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Settings,
  ScrollView,
  Modal
} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  useResponsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import Home from '../../Screens/Home/Home';
import BankInfo from '../../Screens/BankInfo/BankInfo';
import Document from '../../Screens/Document/Document';
import Earnings from '../../Screens/Earnings/Earnings';
import EmergencyContacts from '../../Screens/EmergencyContacts/EmergencyContacts';
import LocalUpcomingRide from '../../Screens/LocalUpcomingRide/LocalUpcomingRide';
import Logout from '../../Screens/Logout/Logout';
import OutStationUpcomingRide from '../../Screens/OutStationUpcomingRide/OutStationUpcomingRide';
import Profile from '../../Screens/Profile/Profile';
import Rides from '../../Screens/Rides/Rides';
import Wallet from '../../Screens/Wallet/Wallet';
import Setting from '../../Screens/Settings/Settings';
import CarTheft from '../../../Assets/CarTheft.png';
import Carpool from '../../../Assets/Carpool.png';
import BankBuilding from '../../../Assets/BankBuilding.png';
import Contact from '../../../Assets/Contact.png';
import Expensive from '../../../Assets/Expensive.png';
import Gear from '../../../Assets/Gear.png';
import HoverCar from '../../../Assets/HoverCar.png';
import LogoutImg from '../../../Assets/Logout.png';
import TestAccount from '../../../Assets/TestAccount.png';
import WalletImg from '../../../Assets/Wallet.png';
import Documents from '../../../Assets/Documents.png';
import TollRequest from '../../Screens/TollRequest/TollRequest';
import ChangePassword from '../../Screens/Settings/ChangePassword';
import Language from '../../Screens/Settings/Language';
import DeleteAccount from '../../Screens/Settings/DeleteAccount';
import TermsAndConditions from '../../Screens/Settings/TermsAndConditions';
import PrivacyPolicy from '../../Screens/Settings/PrivacyPolicy';
import AboutUs from '../../Screens/Settings/AboutUs';
import Notification from '../../Screens/Notification/Notification';
import BasicTick from '../../../Assets/BasicTick.png';
import Cross from '../../../Assets/Cross.png';
import Tick from '../../../Assets/Tick.png';

const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setModalVisible(true);
  };
  const handleYes = () => {
    setIsEnabled(prev => !prev);
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          paddingBottom: responsiveScreenHeight(2),
        }}>
        <View
          style={{
            height: responsiveScreenHeight(6),
            width: responsiveScreenHeight(6),
            borderRadius: responsiveScreenHeight(3),
            borderWidth: 3,
            borderColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: responsiveScreenHeight(5),
              width: responsiveScreenHeight(5),
              borderRadius: responsiveScreenHeight(2.5),
              borderWidth: 3,
              borderColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: responsiveScreenHeight(4),
                width: responsiveScreenHeight(4),
                borderRadius: responsiveScreenHeight(2),

                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2),
                  color: '#000',
                  fontWeight: '600',
                  lineHeight: 30,
                  fontStyle: 'italic',
                }}>
                t
              </Text>
            </View>
          </View>
        </View>
        <View style={{paddingLeft: responsiveScreenWidth(3)}}>
          <Text
            style={{
              fontSize: responsiveScreenFontSize(3),
              color: '#fff',
              fontWeight: 'bold',
              lineHeight: 30,
            }}>
            Tester
          </Text>
          <Text
            style={{
              fontSize: responsiveScreenFontSize(2),
              color: '#fff',
              fontWeight: '600',
              lineHeight: 30,
            }}>
            Tester@gmail.com
          </Text>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={TestAccount}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.subMenuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('Rides')}>
          <Image source={HoverCar} style={styles.icon} resizeMode="contain" />
          <Text style={styles.subMenuText}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('BankInfo')}>
          <Image
            source={BankBuilding}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.subMenuText}>BankInfo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('Document')}>
          <Image source={Documents} style={styles.icon} resizeMode="contain" />
          <Text style={styles.subMenuText}>Document</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('Earnings')}>
          <Image source={Expensive} style={styles.icon} resizeMode="contain" />
          <Text style={styles.subMenuText}>Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('OutStationUpcomingRide')}>
          <Image source={Carpool} style={styles.icon} resizeMode="contain" />
          <Text style={styles.subMenuText}>OutStation Upcoming Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('EmergencyContacts')}>
          <Image source={Contact} style={styles.icon} resizeMode="contain" />
          <Text style={styles.subMenuText}>Emergency Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('Wallet')}>
          <Image source={WalletImg} style={styles.icon} resizeMode="contain" />
          <Text style={styles.subMenuText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('LocalUpcomingRide')}>
          <Image source={CarTheft} style={styles.icon} resizeMode="contain" />
          <Text style={styles.subMenuText}>Local Upcoming Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={() => navigation.navigate('Settings')}>
          <Image source={Gear} style={styles.icon} resizeMode="contain" />
          <Text style={styles.subMenuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subMenuItem}
          onPress={toggleSwitch}>
          <Image source={LogoutImg} style={styles.icon} resizeMode="contain" />
          <Text style={styles.subMenuText}>Logout</Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Top Blue Section */}
              <View style={styles.blueSection}>
                <View
                  style={{
                    height: responsiveScreenHeight(8),
                    width: responsiveScreenHeight(8),
                    borderRadius: responsiveScreenHeight(4),
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Tick}
                    style={{
                      height: responsiveScreenHeight(8),
                      width: responsiveScreenWidth(12),
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* White Section with Text and Buttons */}
              <View style={styles.whiteSection}>
                <Text style={styles.modalText}>
                  Are you sure you want to logout?
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.noButton}
                    onPress={() => setModalVisible(false)}>
                    <Image
                      source={Cross}
                      style={{
                        height: responsiveScreenHeight(4),
                        width: responsiveScreenWidth(6),
                      }}
                      resizeMode="contain"
                    />
                    <Text style={styles.noText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.yesButton}
                    onPress={handleYes}>
                    <Image
                      source={BasicTick}
                      style={{
                        height: responsiveScreenHeight(4),
                        width: responsiveScreenWidth(6),
                        tintColor: '#fff',
                      }}
                      resizeMode="contain"
                    />
                    <Text style={styles.yesText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

// Drawer Navigation
const DrawerNavigation = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false, // Hides header
          drawerStyle: {
            backgroundColor: '#FFFCD0', // Light yellow background
            width: responsiveScreenWidth(80),
          },
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: '#9D1215',
        }}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{drawerItemStyle: {height: 0}}}
        />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Rides" component={Rides} />
        <Drawer.Screen name="BankInfo" component={BankInfo} />
        <Drawer.Screen name="Document" component={Document} />
        <Drawer.Screen name="Earnings" component={Earnings} />

        <Drawer.Screen name="EmergencyContacts" component={EmergencyContacts} />
        <Drawer.Screen name="LocalUpcomingRide" component={LocalUpcomingRide} />
        <Drawer.Screen name="Logout" component={Logout} />
        <Drawer.Screen
          name="OutStationUpcomingRide"
          component={OutStationUpcomingRide}
        />
        <Drawer.Screen name="TollRequest" component={TollRequest} />
        <Drawer.Screen name="Settings" component={Setting} />
        <Drawer.Screen name="Wallet" component={Wallet} />
        <Drawer.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{header: () => null}}
        />
        <Drawer.Screen
          name="Language"
          component={Language}
          options={{header: () => null}}
        />
        <Drawer.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={{header: () => null}}
        />
        <Drawer.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{header: () => null}}
        />
        <Drawer.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{header: () => null}}
        />
        <Drawer.Screen
          name="AboutUs"
          component={AboutUs}
          options={{header: () => null}}
        />
          <Drawer.Screen
          name="Notification"
          component={Notification}
          options={{header: () => null}}
        />
      </Drawer.Navigator>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C3384', // Light yellow background
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  mainMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e0e0e0',
  },
  menuText: {
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: '400',
    lineHeight: 28,
    textAlign: 'left',
    color: '#000',
  },
  arrow: {
    fontSize: 16,
    color: '#666',
  },
  subMenuContainer: {
    paddingLeft: 20,
    marginTop: 5,
  },
  subMenuItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subMenuText: {
    fontSize: responsiveScreenFontSize(2),
    fontWeight: '400',
    lineHeight: 28,
    textAlign: 'left',
    color: '#fff',
    paddingLeft: responsiveScreenWidth(2),
  },
  icon: {
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(8),
    tintColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '30%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  blueSection: {
    flex: 1,
    backgroundColor: '#0C3384',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteSection: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  noButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0C3384',
    flexDirection: 'row',
    alignItems: 'center',
  },
  yesButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#0C3384',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noText: {
    color: '#0C3384',
    fontWeight: '600',
    paddingLeft: responsiveScreenWidth(1),
  },
  yesText: {
    color: '#fff',
    fontWeight: '600',
    paddingLeft: responsiveScreenWidth(1),
  },
});
export default DrawerNavigation;
