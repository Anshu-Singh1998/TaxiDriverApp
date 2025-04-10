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
import outStationReducer from '../Slices/OutStationSlice';
import localReducer from "../Slices/LocalRideSlice"
import otpReducer from "../Slices/otpSlice"
import availabilityReducer from "../Slices/AvailabilitySlice"
import kmReducer from "../Slices/KilometerSlice"
import driverEarningReducer from "../Slices/DriverEarningSlice"


const store = configureStore({
  reducer: {
    login: loginReducer,
    status: statusReducer,
    profile: profileReducer,
    bank: bankReducer,
    contact: contactReducer,
    document: documentReducer,
    trips: ridesReducer,
    settings: settingsReducer,
    toll: tollReducer,
    wallet: walletReducer,
    driver:driverReducer,
    outStation:outStationReducer,
    local:localReducer,
    otp:otpReducer,
    availability:availabilityReducer,
    kilometer:kmReducer,
    driverEarning:driverEarningReducer
  },
});

export default store;
