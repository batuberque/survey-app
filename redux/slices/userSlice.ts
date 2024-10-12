import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axiosInstance from '~/api/axios';

interface Name {
  firstname: string;
  lastname: string;
}

interface Geolocation {
  lat: string;
  long: string;
}

interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
}

interface UserState {
  user: User | null;
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  fetchError: string | null;
  updateError: string | null;
}

const initialState: UserState = {
  user: null,
  fetchStatus: 'idle',
  updateStatus: 'idle',
  fetchError: null,
  updateError: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axiosInstance.get('/users/1');
  return response.data;
});

export const updateUser = createAsyncThunk('user/updateUser', async (userData: User) => {
  const response = await axiosInstance.put(`/users/${userData.id}`, userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.fetchStatus = 'succeeded';
        state.user = action.payload;
        state.fetchError = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.error.message || 'Failed to fetch user';
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = 'loading';
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.updateStatus = 'succeeded';
        state.user = action.payload;
        state.updateError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.updateError = action.error.message || 'Failed to update user';
      });
  },
});

export default userSlice.reducer;
