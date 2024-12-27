import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import apiService from "../../utils/apiService";
import { SEND_MESSAGE_TO_COPILOT, SEND_MESSAGE_TO_CUSTOMER } from "../../utils/Endpoints";

export const sendMessageToCustomer = createAsyncThunk(
  'sendMessageToCustomer',
  async (messageData: { 
    user_id: string, 
    session_id: string, 
    customer_session_id: string, 
    customer_id: string, 
    conv_id: string, 
    message: string, 
    datetime: string, 
    is_direct_agent_message: string 
  }, thunkAPI) => {
    const { user_id, session_id, customer_session_id, customer_id, conv_id, message, datetime, is_direct_agent_message } = messageData;
    try {
      const response: AxiosResponse = await apiService(SEND_MESSAGE_TO_CUSTOMER, {
        method: "POST",
        data: JSON.stringify({
          user_id,
          session_id,
          customer_session_id,
          customer_id,
          conv_id,
          message,
          datetime,
          is_direct_agent_message
        }),
      });

      if (response.status !== 200) {
        throw new Error('Failed to send message');
      }
      const data = await response.data;
      return data;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendMessageToCopilot = createAsyncThunk(
  'sendMessageToCopilot',
  async (messageData: {
    user_id: string,
    session_id: string,
    customer_session_id: string,
    customer_id: string,
    cust_conv_id: string,
    message: string,
    datetime: string,
    is_agent_message_to_copilot: string,
    is_agent_edited_copilot_message: string,
    copilot_msg_id: string,
    is_direct_agent_message: string
  }, thunkAPI) => {
    const {
      user_id,
      session_id,
      customer_session_id,
      customer_id,
      cust_conv_id,
      message,
      datetime,
      is_agent_message_to_copilot,
      is_agent_edited_copilot_message,
      copilot_msg_id,
      is_direct_agent_message
    } = messageData;
    try {
      const response: AxiosResponse = await apiService(SEND_MESSAGE_TO_COPILOT, {
        method: "POST",
        data: JSON.stringify({
          user_id,
          session_id,
          customer_session_id,
          customer_id,
          cust_conv_id,
          message,
          datetime,
          is_agent_message_to_copilot,
          is_agent_edited_copilot_message,
          copilot_msg_id,
          is_direct_agent_message
        }),
      });

      if (response.status !== 200) {
        throw new Error('Failed to send message to Copilot');
      }
      const data = await response.data;
      return data;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  sendMessageResponse: null,
  status: 'idle'
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessageToCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sendMessageResponse = action.payload;
      })
      .addCase(sendMessageToCustomer.rejected, (state) => {
        state.status = 'failed';
        state.sendMessageResponse = null;
      })
      .addCase(sendMessageToCopilot.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessageToCopilot.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sendMessageResponse = action.payload;
      })
      .addCase(sendMessageToCopilot.rejected, (state) => {
        state.status = 'failed';
        state.sendMessageResponse = null;
      });
  },
});

export default messageSlice.reducer;
