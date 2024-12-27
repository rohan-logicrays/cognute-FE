import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import apiService from "../../utils/apiService";
import { GET_COPILTE_CONVERSATION, GET_CUSTOMER_CONVERSATION } from "../../utils/Endpoints";


export const getCustomerConversation = createAsyncThunk(
    'getCustomerConversation',
    async (conversationInfo: { customer_id: string; customer_session_id: string; conv_id: string }, thunkAPI) => {
    let { userId, session_id } = JSON.parse(localStorage.getItem('userData') || '{}');
    let payload = {
        "user_id": userId,
        "session_id": session_id,
        "customer_id": conversationInfo.customer_id,
        "customer_session_id": conversationInfo.customer_session_id,
        "conv_id": conversationInfo.conv_id
      }
      try {
        const response: AxiosResponse = await apiService(GET_CUSTOMER_CONVERSATION, {
          method: "POST",
          data: JSON.stringify(payload), 
        });
       
        if (response.status !== 200) {
          throw new Error('Invalid credentials');
        }
        const data = await response.data;
        data.customerSessionId = conversationInfo.customer_session_id;
        return data; 
  
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

export const getCopilotConversation = createAsyncThunk(
  'getCopilotConversation',
  async (conversationInfo: { customer_id: string; customer_session_id: string; conv_id: string }, thunkAPI) => {
    let { userId, session_id } = JSON.parse(localStorage.getItem('userData') || '{}');
    let payload = {
      "user_id": userId,
      "session_id": session_id,
      "customer_id": conversationInfo.customer_id,
      "customer_session_id": conversationInfo.customer_session_id,
      "cust_conv_id": conversationInfo.conv_id
    }
    try {
      const response: AxiosResponse = await apiService(GET_COPILTE_CONVERSATION, {
        method: "POST",
        data: JSON.stringify(payload),
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
    customerConversation: null,
    copilotConversation: null,
    status:'idle'
  };

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCustomerConversation.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getCustomerConversation.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.customerConversation = action.payload;
        })
        .addCase(getCustomerConversation.rejected, (state) => {
          state.status = 'failed';
        })
        .addCase(getCopilotConversation.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getCopilotConversation.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.copilotConversation = action.payload;
        })
        .addCase(getCopilotConversation.rejected, (state) => {
          state.status = 'failed';
        })

    },
});

  // export const { loginSuccess, logout } = authSlice.actions;
  export default conversationSlice.reducer;