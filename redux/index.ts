// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import roomSlice from './roomSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    room: roomSlice
});

export default rootReducer;
