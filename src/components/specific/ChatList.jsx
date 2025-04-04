import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";
import { useParams } from "react-router-dom";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  userId = "",
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      direction={"column"}
      overflow={"auto"}
      height={"100vh"}
    >
      {chats.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        // console.log(members,onlineUsers)

        const isOnline = members.some((member,index) => onlineUsers.includes(member));
        return (
          <ChatItem
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={groupChat ? avatar : [avatar]}
            name={name}
            _id={_id}
            key={_id}
            index={index}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
