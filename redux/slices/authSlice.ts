import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { LoginParams, loginService } from '~/api/authService';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<string, LoginParams>(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      console.log('Login request initiated with:', { username, password });
      const token = await loginService({ username, password });

      console.log('Token received:', token);

      await AsyncStorage.setItem('token', token);
      return token;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please check your credentials.';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk<void>('auth/logout', async () => {
  console.log('Logout request initiated');
  await AsyncStorage.removeItem('token');
  console.log('Token removed from storage');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      console.log('Error state reset');
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log('Login pending...');
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        console.log('Login successful. Token set.');
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.error('Login failed:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('Logout successful. State reset.');
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
