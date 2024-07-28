
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import themeReducer from './theme';
import postsReducer from './postSlice';

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
    posts: postsReducer,
   
})


export default rootReducer;