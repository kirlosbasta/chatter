import { configureStore } from '@reduxjs/toolkit';
import themeSliceReducer from './themeSlice';
import conversationSliceReducer from './conversations';

const store = configureStore({
  reducer: {
    themeKey: themeSliceReducer,
    conversations: conversationSliceReducer,
  },
});

export default store;
