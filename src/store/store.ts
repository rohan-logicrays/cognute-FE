import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import customerReducer from './reducers/customerSlice'
import conversationReducer from "./reducers/conversationSlice"
import messagesReducer from "./reducers/messagesSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    customer: customerReducer,
    conversation: conversationReducer,
    messages: messagesReducer
})

export const store = configureStore({
  reducer: rootReducer
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type IRootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']