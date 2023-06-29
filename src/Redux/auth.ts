import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null; // Add the username property
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  username: null, // Initialize the username property
};

interface LoginCredentials {
  username: string;
  password: string;
}
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    const url = `https://wosh-test.herokuapp.com/api/authorization/service/login?username=${credentials.username}&password=${credentials.password}`;
    try {
      const response = await axios.post(url);
      // logging the response data
      if (response.status === 200) {
        // logging before dispatching login.fulfilled

        return response.data; // This will be the payload for the fulfilled action
      } else {
        // logging before rejecting with value
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      // logging before rejecting with error data
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        // handle the pending state
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })

      .addCase(login.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
