import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../ constants/events";

const initialState = {
  notificationsCount: 0,
  newMessageAlert:
    getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, get: true }) || [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotifications: (state) => {
      state.notificationsCount += 1;
    },
    resetNotifications: (state) => {
      state.notificationsCount = 0;
    },
    setNewMessageAlert: (state, action) => {
      const chatId = action.payload.chatId;
      const index = state.newMessageAlert.findIndex(
        (item) => chatId === item.chatId
      );
      if (index === -1) {
        state.newMessageAlert.push({ chatId, count: 1 });
      } else {
        state.newMessageAlert[index].count += 1;
      }
    },
    removeNewMessagAlert: (state, action) => {
      const chatId = action.payload;
      state.newMessageAlert = state.newMessageAlert.filter(
        (item) => item.chatId !== chatId
      );
    },
  },
});

export default chatSlice;

export const {
  incrementNotifications,
  resetNotifications,
  setNewMessageAlert,
  removeNewMessagAlert,
} = chatSlice.actions;
