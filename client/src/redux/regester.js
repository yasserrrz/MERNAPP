

import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    firstName:null,
    secondName : null,
    email : null,
    password : null,
    picture: null,

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload.firstName;
        },
        setSecondName: (state, action) => {
            state.secondName = action.payload.secondName;
        },
        setEmail: (state, action) => {
            state.email = action.payload.email;
        },
        setPassword: (state, action) => {
            state.password = action.payload.password;
        },
        setPicture: (state, action) => {
            state.picture = action.payload.picture;
        }
    }
})