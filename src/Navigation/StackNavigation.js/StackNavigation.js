import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Wallet from '../../Screens/Wallet/Wallet';
import Settings from '../../Screens/Settings/Settings';
import Rides from '../../Screens/Rides/Rides';
import Profile from '../../Screens/Profile/Profile';
import OutStationUpcomingRide from '../../Screens/OutStationUpcomingRide/OutStationUpcomingRide';
import Logout from '../../Screens/Logout/Logout';
import LocalUpcomingRide from '../../Screens/LocalUpcomingRide/LocalUpcomingRide';
import EmergencyContacts from '../../Screens/EmergencyContacts/EmergencyContacts';
import Earnings from '../../Screens/Earnings/Earnings';
import Document from '../../Screens/Document/Document';
import BankInfo from '../../Screens/BankInfo/BankInfo';
import Home from '../../Screens/Home/Home';
import TollRequest from '../../Screens/TollRequest/TollRequest';
import LoginSplash from '../../Auth/LoginSplash';
// import SignIn from '../../Auth/SignIn';
import ChangePassword from '../../Screens/Settings/ChangePassword';
import PrivacyPolicy from '../../Screens/Settings/PrivacyPolicy';
import TermsAndConditions from '../../Screens/Settings/TermsAndConditions';
import DeleteAccount from '../../Screens/Settings/DeleteAccount';
import Language from '../../Screens/Settings/Language';
import AboutUs from '../../Screens/Settings/AboutUs';
import Notification from '../../Screens/Notification/Notification';
import DocumentViewer from '../../Screens/Document/DocumentViewer';
import LoginScreen from '../../Screens/LocalUpcomingRide/LoginScreen';
const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      animation: 'none',
    }}>
    <Stack.Screen name="Home" component={Home} options={{header: () => null}} />
    <Stack.Screen
      name="BankInfo"
      component={BankInfo}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Document"
      component={Document}
      options={{header: () => null}}
    />
     <Stack.Screen
      name="DocumentViewer"
      component={DocumentViewer}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Earnings"
      component={Earnings}
      options={{header: () => null}}
    />

    <Stack.Screen
      name="EmergencyContacts"
      component={EmergencyContacts}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="LocalUpcomingRide"
      component={LocalUpcomingRide}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Logout"
      component={Logout}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="OutStationUpcomingRide"
      component={OutStationUpcomingRide}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Rides"
      component={Rides}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Wallet"
      component={Wallet}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="TollRequest"
      component={TollRequest}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="LoginSplash"
      component={LoginSplash}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{header: () => null}}
    />
   
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="Language"
      component={Language}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="DeleteAccount"
      component={DeleteAccount}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="TermsAndConditions"
      component={TermsAndConditions}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicy}
      options={{header: () => null}}
    />
    <Stack.Screen
      name="AboutUs"
      component={AboutUs}
      options={{header: () => null}}
    />
      <Stack.Screen
      name="Notification"
      component={Notification}
      options={{header: () => null}}
    />

  </Stack.Navigator>
);
export default StackNavigator;
