import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    messages: [],
    unreadCount: 0,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.unreadCount = action.payload.filter(
        (message) => !message.read
      ).length;
    },
    setRead: (state, action) => {
      const { id } = action.payload;
      const message = state.messages.find((message) => message.id === id);
      if (message) {
        message.read = true;
        state.unreadCount = state.messages.filter(
          (message) => !message.read
        ).length;
      }
    },
  },
});

export const { setMessages, setRead } = inboxSlice.actions;

export const fetchMessages = (email) => (dispatch) => {
  const sanitizedEmail = email.replace(/[@.]/g, "");
  axios
    .get(
      `https://mail-box-client-23c51-default-rtdb.firebaseio.com/${sanitizedEmail}/outbox.json`
    )
    .then((response) => {
      const messages = Object.values(response.data).map((message) => ({
        ...message,
        read: false,
      }));
      dispatch(setMessages(messages));
    })
    .catch((error) => {
      console.log(error);
    });
};

export default inboxSlice.reducer;