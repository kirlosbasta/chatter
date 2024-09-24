import { createSlice } from '@reduxjs/toolkit';

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: [],
  reducers: {
    setConversations: (state, action) => (state = action.payload),
    addConversation: (state, action) => {
      const index = state.findIndex(
        (conversation) =>
          conversation?._id?.toString() === action.payload?._id?.toString(),
      );
      if (index !== -1) {
        state[index] = action.payload;
      } else {
        state.unshift(action.payload);
      }
    },
    updateConversation: (state, action) => {
      const index = state.findIndex(
        (conversation) =>
          conversation?._id?.toString() === action.payload?._id?.toString(),
      );
      state[index] = action.payload;
    },
    deleteConversation: (state, action) => {
      const index = state.findIndex(
        (conversation) => conversation._id?.toString() === action.payload,
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {
  setConversations,
  addConversation,
  updateConversation,
  deleteConversation,
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
