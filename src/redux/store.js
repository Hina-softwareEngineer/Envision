import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './allReducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
