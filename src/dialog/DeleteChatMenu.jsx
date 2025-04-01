import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu } from "../redux/reducers/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useAsyncMutation } from "../hooks/hook";
import {
  useDeleteGroupMutation,
  useLeaveGroupMutation,
} from "../redux/api/api";
import { Navigate, useNavigate } from "react-router-dom";

const DeleteChatMenu = ({ deleteOptionAnchor }) => {
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const navigate = useNavigate();

  const [deleteChat, _, deleteChatData] = useAsyncMutation(
    useDeleteGroupMutation
  );
  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const isGroup = selectedDeleteChat.groupChat;

  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteOptionAnchor.current = null;
  };

  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
  };
  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteOptionAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon />
            <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <DeleteIcon />
            <Typography>Delete Chat</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
