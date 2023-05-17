import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, AppThunk } from "../store";

export interface User {
  username: string;
  email: string;
  country: string;
  isSeller?: boolean | undefined;
  img?: string;
  countryCode?: string;
  phone?: string;
  desc?: string;
}

export interface UserState {
  currentUser: User | null;
  isFetching: boolean;
  error: boolean | string;
}

interface UserDetails {
  username: string;
  password: string;
}

type LoginError = {
  message: string;
}

interface Session {
  accessToken: string;
  refreshToken: string;
}

const BASE_URL = "http://localhost:1337/api";

// Our createAsyncthunk to signup
export const signUp = createAsyncThunk(
  'user/signUp',
  async (user: User, thunkAPI) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, user, { withCredentials: true });
    return response.data;
  }
);

// Our createAsyncthunk to login
export const login = createAsyncThunk<Session, UserDetails, { rejectValue: LoginError }>(
  'user/login',
  async (user: UserDetails, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, user, { withCredentials: true });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        message: "Invalid credentials."
      });
    }
  }
);

// Our createAsyncthunk to fetch signed in user
export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (thunkAPI) => {
    const response = await axios.get(`${BASE_URL}/users/me`, { withCredentials: true });
    return response.data;
  }
);

// Our createAsyncthunk to fetch any user
export const findUser = createAsyncThunk(
  'user/findUser',
  async (userId: string, thunkAPI) => {
    const response = await axios.get(`${BASE_URL}/users/get/${userId}`, { withCredentials: true });
    return response.data;
  }
);

// Our createAsyncthunk to logout
export const logout = createAsyncThunk(
  'user/logout',
  async (thunkAPI) => {
    const response = await axios.delete(`${BASE_URL}/users/sessions`, { withCredentials: true });
    return response.data;
  }
);

const initialState: UserState = {
  currentUser: null,
  isFetching: false,
  error: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // loginStart: (state) => {
    //   state.isFetching = true;
    // },
    // loginSuccess: (state, action: PayloadAction<User>) => {
    //   state.isFetching = false;
    //   state.currentUser = action.payload;
    // },
    // loginFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    resetState: state => initialState,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(login.pending, (state, action) => {
      state.isFetching = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = false;
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isFetching = false;
      if (payload) state.error = payload.message;
    })
    builder.addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    })
  },
});

export const { resetState } = userSlice.actions; // loginStart, loginSuccess, loginFailure,
export default userSlice.reducer;