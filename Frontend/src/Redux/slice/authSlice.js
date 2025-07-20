import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to check if token cookie exists
const hasTokenCookie = () => {
  return document.cookie.split(';').some(cookie => 
    cookie.trim().startsWith('token=') && 
    cookie.trim().split('=')[1] && 
    cookie.trim().split('=')[1] !== ''
  );
};

const initializeAuthState = () => {
  const hasToken = hasTokenCookie();
  return {
    isLoggedIn: false, // Always start as false, let fetchCurrentUser determine actual state
    user: null,
    loading: hasToken, // If we have a token, we'll be loading to verify it
    error: null,
    initialized: false // Track if we've completed initial auth check
  };
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/v1/users/current-user", { 
        withCredentials: true 
      });
      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Session expired");
    }
  }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({email, userName, password}, { rejectWithValue }) => {
        try {
            const res = await axios.post("/v1/users/login", {email, userName, password}, {withCredentials: true});
            return res.data.message;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/v1/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      return data.data.message; 
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
    async(_, { rejectWithValue }) => {
        try {
            const res = await axios.post("/v1/users/logout", {}, {withCredentials: true});
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: initializeAuthState(),
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Current User
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.initialized = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                // Clear token cookie if current user fetch fails
                document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                state.error = action.payload;
                state.loading = false;
                state.isLoggedIn = false;
                state.user = null;
                state.initialized = true;
            })
            
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
                state.initialized = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoggedIn = false;
                state.user = null;
                state.loading = false;
            })
            
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
                state.initialized = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            
            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                state.isLoggedIn = false;
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                // Even if logout fails on server, clear local state
                document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                state.isLoggedIn = false;
                state.user = null;
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;