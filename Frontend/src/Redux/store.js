import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import popupReducer from "./slice/popupSlice"
import hamburgerReducer from './slice/hamburgerSlice'
import themeReducer from './slice/themeSlice'
import videoReducer from './slice/videoSlice'

export const store = configureStore({
    reducer:{
        auth : authReducer,
        popup: popupReducer, 
        hamburger: hamburgerReducer,
        theme: themeReducer,
        videos: videoReducer
    }
})