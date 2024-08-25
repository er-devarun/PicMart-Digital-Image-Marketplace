import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
    name: "post",
    initialState: {
        allPosts: [],
        myPosts: [],
        myFavourites: [],
    },
    reducers: {
        setAllPosts: (state, action) => {
            state.allPosts = action.payload;
        },
        setMyPosts: (state, action) => {
            state.myPosts = action.payload;
        },
        setMyFavourites: (state, action) => {
            state.myFavourites = action.payload;
        },
    }
})



export const { setAllPosts, setMyPosts, setMyFavourites } = postSlice.actions;
export default postSlice.reducer;