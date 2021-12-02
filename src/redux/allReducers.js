import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../redux/auth';

export default combineReducers({
  authState: authReducer,
});
