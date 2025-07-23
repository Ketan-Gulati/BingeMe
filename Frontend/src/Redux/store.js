import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import popupReducer from "./slice/popupSlice"
import sideBarReducer from './slice/sideBarSlice'
import themeReducer from './slice/themeSlice'
import videoReducer from './slice/videoSlice'

export const store = configureStore({
    reducer:{
        auth : authReducer,
        popup: popupReducer, 
        sideBar: sideBarReducer,
        theme: themeReducer,
        videos: videoReducer
    }
})