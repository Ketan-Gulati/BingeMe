import { createSlice, createAsyncThunk, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async()=>{
        const res = await axios.get("/v1/users/current-user", {withCredentials : true}); 
        return res.data.message;
    }
)

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({email, userName, password})=>{
        const res = await axios.post("/v1/users/login",{email, userName, password}, {withCredentials: true});
        return res.data.message;  // acts as payload for extraReducer
    }
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/v1/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      
      // Store tokens in state if needed
      return data.data.message; // Assuming your ApiResponse structure
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Registration failed",
        status: err.response?.status
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async()=>{
        const res = await axios.post("/v1/users/logout", {}, {withCredentials: true});
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
                    state.user = action.payload;
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