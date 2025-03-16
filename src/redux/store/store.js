import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../Slices/LoginSlices';
import statusReducer from '../Slices/OnlineSlice';
import profileReducer from "../Slices/RecieveProfileSlice"

const store = configureStore({
  reducer: {
    login: loginReducer,
    status: statusReducer,
    profile:profileReducer
  },
});

export default store;
