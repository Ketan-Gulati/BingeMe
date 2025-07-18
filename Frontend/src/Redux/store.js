import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import popupReducer from "./slice/popupSlice"

export const store = configureStore({
    reducer:{
        auth : authReducer,
        popup: popupReducer, 
    }
})