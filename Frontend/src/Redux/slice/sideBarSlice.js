import { createSlice } from "@reduxjs/toolkit";


const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState: {
        isOpen: false 
    },
    reducers: {
        toggleOpen: (state)=>{
            state.isOpen = !state.isOpen
        },
        openSidebar: (state) => {
            state.isOpen = true;
        },
        closeSidebar: (state) => {
            state.isOpen = false;
        }
    }
})

export const {toggleOpen,openSidebar,closeSidebar} = sideBarSlice.actions
export default sideBarSlice.reducer