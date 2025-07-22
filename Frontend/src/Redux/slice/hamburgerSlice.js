import { createSlice } from "@reduxjs/toolkit";

const hamburgerSlice = createSlice({
    name: "hamburger",
    initialState: {
        isOpen: false,      // For mobile view
        isCompact: false,   // For large screen compact sidebar
    },
    reducers: {
        toggleMobile(state) {
            state.isOpen = !state.isOpen;
        },
        toggleCompact(state) {
            state.isCompact = !state.isCompact;
        },
        closeMobile(state) {
            state.isOpen = false;
        },
        setCompact(state, action) {
            state.isCompact = action.payload;
        },
    },
});

export const {
    toggleMobile,
    toggleCompact,
    closeMobile,
    setCompact
} = hamburgerSlice.actions;

export default hamburgerSlice.reducer;
