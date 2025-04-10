import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/Navigation/DrawerNavigation/DrawerNavigation';
import Splash from './src/Auth/Splash';
import LoginSplash from './src/Auth/LoginSplash';
import Login from './src/Auth/Login';
import SignIn from './src/Auth/SignIn';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
// import {I18nextProvider} from 'react-i18next';
// import i18n from './src/locales/i18n';

const Stack = createNativeStackNavigator();

const Auth = () => (
  <Stack.Navigator
    initialRouteName="LoginSplash"
    screenOptions={{
      headerShown: false,
      animation: 'none',
    }}>
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
  </Stack.Navigator>
);

const App = () => {
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  useEffect(() => {
    // Show Splash for 5 seconds
    setTimeout(() => {
      setIsSplashComplete(true);
    }, 5000);
  }, []);
  return (
    <Provider store={store}>
     
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen
              name="DrawerNavigation"
              component={DrawerNavigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
     
    </Provider>
  );
};

export default App;
