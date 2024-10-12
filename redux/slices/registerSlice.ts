import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '~/api/axios';
import { RegisterParams } from '~/api/registerService';

interface RegisterState {
  loading: boolean;
  status: 'idle' | 'loading' | 'failed';
  success: boolean;
}

const initialState: RegisterState = {
  loading: false,
  status: 'idle',
  success: false,
};

export const register = createAsyncThunk<string, RegisterParams>(
  'register/user',
  async ({ username, password, email, telephone }: RegisterParams) => {
    try {
      console.log('Register request initiated with:', { username, password, email, telephone });
      const response = await axiosInstance.post('/users', {
        username,
        password,
        email,
        telephone,
      });
      console.log('Response received:', response);
      return response.data;
    } catch (error: any) {
      console.error('API error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.status = 'idle';
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.success = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.status = 'idle';
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.success = false;
      });
  },
});

export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;
