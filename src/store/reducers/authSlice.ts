import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from '../../utils/apiService';
import {LOGIN_USER} from '../../utils/Endpoints';
import { AxiosResponse } from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { userId: string; password: string }, thunkAPI) => {
    const { userId, password } = credentials;

    try {
      const response:AxiosResponse = await apiService(LOGIN_USER, {
        method: "POST",
        data: JSON.stringify({ userId, password }), 
      });
      console.log('response: ', response);
      
      if (response.status !== 200) {
        throw new Error('Invalid credentials');
      }
      const data = await response.data;
      data.userId = userId;
      localStorage.setItem('userData',JSON.stringify(data));
      return data; 

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: JSON.parse(localStorage.getItem('userData') as string) || null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        // state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        // state.error = action.payload;
      });
  },
});

// export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
