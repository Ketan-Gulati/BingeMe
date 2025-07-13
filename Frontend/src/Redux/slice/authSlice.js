import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async()=>{
        const res = await axios.get("/v1/users/current-user", {withCredentials : true});
        return res.data.data;
    }
)

const authSlice = createSlice(
    {
        name: "auth",
        initialState : {
            isLoggedIn: false,
            user: null,
            loading: false,
            error:  null,
        },
        reducers: {
            logout: (state)=>{
                state.isLoggedIn = false;
                state.user = null;
            }
        },
        extraReducers: (builder)=>{
            builder
                .addCase(fetchCurrentUser.pending, (state)=>{
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchCurrentUser.fulfilled, (state,action)=>{
                    state.isLoggedIn = true;
                    state.user = action.payload
                    state.loading = false;
                })
                .addCase(fetchCurrentUser.rejected, (state,action)=>{
                    state.error = action.payload;
                    state.loading = false;
                })
        }
    }
)

export const {logout} = authSlice.actions;
export default authSlice.reducer;