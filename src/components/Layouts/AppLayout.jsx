import React, { useCallback, useEffect, useRef, useState } from "react";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import Header from "./Header";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../ constants/sampleData";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../specific/profile";
import { useDeleteGroupMutation, useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { getSocket } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  NEW_USER_CAME,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../ constants/events";
import { useSocketEvents } from "../../hooks/hook";
import {
  incrementNotifications,
  setNewMessageAlert,
} from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../../dialog/DeleteChatMenu";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const socket = getSocket();
    // console.log(socket.id)

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessageAlert } = useSelector((state) => state.chat);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const deleteMenuAnchor = useRef(null);

    const chatId = params.chatId;

    // useEffect(() =>{
    //   console.log("chatId changed",chatId)
    // },[chatId])

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
    }, [newMessageAlert]);

    const handleDeleteChat = (event, _id, groupChat) => {
      event.preventDefault();
      deleteMenuAnchor.current = event.currentTarget;
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId: _id, groupChat }));
    };

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    const newMessageAlertHandler = useCallback(
      (data) => {
        // console.log(data, chatId);
        // console.count("new message");
        if (data.chatId === chatId) return;
        // console.count("new message");

        // console.log(data);
        dispatch(setNewMessageAlert(data));
      },
      [chatId]
    );

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotifications());
    }, [dispatch]);

    const refetchListner = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const getOnlineUsers = useCallback((onlineUsers) => {
      // console.log("onLineUser",onlineUsers);
      setOnlineUsers(onlineUsers);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListner,
      [ONLINE_USERS]: getOnlineUsers,
    };

    useSocketEvents(socket, eventHandlers);

    useEffect(() => {
      if (user._id && user._id !== true && user._id !== false)
        socket.emit(NEW_USER_CAME, user._id);
    }, [user]);

    return (
      <>
        <Title title="Chat App" />
        <Header />
        <DeleteChatMenu deleteOptionAnchor={deleteMenuAnchor.current} />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              chats={data?.chats}
              chatId={chatId}
              userId={user._id}
              w={"70vw"}
              newMessagesAlert={newMessageAlert}
              onlineUsers={onlineUsers}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <Grid container style={{ height: "calc(100vh - 4rem)" }}>
          <Grid
            item
            xs={0}
            sm={4}
            md={3}
            lg={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                newMessagesAlert={newMessageAlert}
                onlineUsers={onlineUsers}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent
              {...props}
              socket={socket}
              chatId={chatId}
              user={user}
            />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              bgcolor: "rgba(0,0,0,0.85)",
              color: "white",
            }}
            height={"100%"}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
