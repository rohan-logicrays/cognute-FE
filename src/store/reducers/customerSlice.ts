import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FILTER_CUSTOMER_LIST, GET_CUSTOMER_LIST } from "../../utils/Endpoints";
import { AxiosResponse } from "axios";
import apiService from "../../utils/apiService";


export const getCustomerList = createAsyncThunk(
    'customerList',
    async (_credentials:any, thunkAPI) => {
    let { userId, session_id } = JSON.parse(localStorage.getItem('userData') || '{}');
      try {
        const response: AxiosResponse = await apiService(GET_CUSTOMER_LIST, {
          method: "POST",
          data: JSON.stringify({ user_id:userId, session_id }), 
        });
        if (response.status !== 200) {
          throw new Error('Invalid credentials');
        }
        const data = await response.data;
        return data; 
  
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );



export const filterCustomerList = createAsyncThunk(
    'filterCustomerList',
    async (status:string, thunkAPI) => {
    let { userId, session_id } = JSON.parse(localStorage.getItem('userData') || '{}');
      try {
        const response: AxiosResponse = await apiService(FILTER_CUSTOMER_LIST, {
          method: "POST",
          data: JSON.stringify({ user_id:userId, session_id , status }), 
        });
        if (response.status !== 200) {
          throw new Error('Invalid credentials');
        }
        const data = await response.data;
        return data; 
  
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

const initialState = {
    customersList: [],
    status:'idle'
  };
  
  const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCustomerList.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getCustomerList.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.customersList = action.payload;
        })
        .addCase(getCustomerList.rejected, (state) => {
          state.status = 'failed';
          state.customersList = [];
        })
        .addCase(filterCustomerList.pending, (state) => {
          state.status = 'loading';     
        })
        .addCase(filterCustomerList.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.customersList = action.payload;
        })
        .addCase(filterCustomerList.rejected, (state) => {
          state.status = 'failed';
          state.customersList = [];
        });
    },
  });
  
  // export const { loginSuccess, logout } = authSlice.actions;
  export default customerSlice.reducer;