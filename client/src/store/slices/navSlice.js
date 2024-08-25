import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: "nav",
    initialState: {
        sideBar: false,
        tab: "",
    },
    reducers: {
        toggleSideBar: (state) => {
            state.sideBar = !state.sideBar;
        },
        setTab: (state, action) => {
            state.tab = action.payload;
        },
    }
});

export const { toggleSideBar, setTab } = navSlice.actions;
export default navSlice.reducer;