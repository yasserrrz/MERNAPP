import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      token:null,
      user : null,
      userId: null
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
      setLogin: (state, action) => {
        console.log("Received user data:", action.payload);
        return {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            userId: action.payload.user._id,
            
        };
    },
    setLogout: (state) => {
        return {
            ...state,
            token: null,
            user: null
        };
    },
          setFriends :(state , action)=>{
            if(state.user){
                state.user.friends = action.payload.friends
            }else{
                console.log('user friends none exist ')
            }
          }
    }
})


export const { setLogin, setLogout, setFriends } = userSlice.actions;

export default userSlice.reducer;