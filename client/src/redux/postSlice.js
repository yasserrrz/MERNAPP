import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    posts : []
}


const postSlice = createSlice({
    name:"post", 
     initialState ,
     reducers:{
        setPosts : (state , action)=>{
            state.posts = action.payload
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
              if (post._id === action.payload.post._id) return action.payload.post;
              return post;
            });
            state.posts = updatedPosts;
          },
     }
});

export const {setPost , setPosts}= postSlice.actions;
export default postSlice.reducer