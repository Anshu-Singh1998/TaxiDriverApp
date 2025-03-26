import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../Slices/LoginSlices';
import statusReducer from '../Slices/OnlineSlice';
import profileReducer from '../Slices/RecieveProfileSlice';
import bankReducer from '../Slices/BankIndoSlice';
import contactReducer from '../Slices/ContactSlice';
import documentReducer from '../Slices/DocumentSlice';
import ridesReducer from '../Slices/ridesSlice';
import settingsReducer from '../Slices/SettingsSlice';
import tollReducer from '../Slices/TollSlice';
import walletReducer from '../Slices/WalletSlice';
import driverReducer from "../Slices/DriverListSlice"

const store = configureStore({
  reducer: {
    login: loginReducer,
    status: statusReducer,
    profile: profileReducer,
    bank: bankReducer,
    contact: contactReducer,
    document: documentReducer,
    rides: ridesReducer,
    settings: settingsReducer,
    toll: tollReducer,
    wallet: walletReducer,
    driver:driverReducer
  },
});

export default store;
