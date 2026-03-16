import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  messages: [],
  activeChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setFriends(state, action) {
      state.friends = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setActiveChat(state, action) {
      state.activeChat = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { setFriends, setMessages, setActiveChat, addMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
