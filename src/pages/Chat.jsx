import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import AppLayout from "../components/Layouts/AppLayout";
import { gray } from "../ constants/colors";
import { IconButton, Skeleton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../styledComponents";
import { orange } from "../ constants/colors";
import FileMenu from "../dialog/FileMenu";
import { sampleMessage } from "../ constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../ constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/Layouts/Loaders";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

// import AppLayout from '../components/Layouts/AppLayout'
// import { ChatBubbleOutlineOutlined } from '@mui/icons-material'

const Chat = ({ chatId, user }) => {
  const params = useParams();
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const bottomRef = useRef(null);

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatIdRef = useRef(chatId);

  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  const dispatch = useDispatch();

  const socket = getSocket();
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  // console.log(oldMessagesChunk);

  const members = chatDetails?.data?.chat?.members || [];

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  // console.log(oldMessagesChunk)

  useErrors(errors);
  // console.log(messages);

  const newMessagesHandler = useCallback(
    (data) => {
      // console.log(data.chatIdchatId);
      if (data.chatId !== chatIdRef.current) return;
      // console.log(data.message);
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  const startTypingListner = useCallback(
    (data) => {
      // console.log(data);
      if (data.chatId !== chatIdRef.current) return;
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingListner = useCallback(
    (data) => {
      if (data.chatId !== chatIdRef.current) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListner = useCallback(
    (data) => {
      if (chatId !== data.chatId) return;
      const messageForAlert = {
        content: message,
        _id: uuid(),
        sender: {
          _id: uuid(),
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      // console.log(messageForAlert)
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = useMemo(
    () => ({
      [NEW_MESSAGE]: newMessagesHandler,
      [START_TYPING]: startTypingListner,
      [STOP_TYPING]: stopTypingListner,
      [ALERT]: alertListner,
    }),
    []
  );

  useSocketEvents(socket, eventHandler, chatId);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");

    // console.log(message);
  };

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.currentData?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.currentData?.messages
  );

  const allMessages = [...oldMessages, ...messages];
  // console.log(allMessages)
  // for auto scrolling
  // const lastMessageRef = useRef(null);

  // // Auto-scroll when messages change
  // useEffect(() => {
  //   if (lastMessageRef.current) {
  //     lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      setIamTyping(false);
      socket.emit(STOP_TYPING, { members, chatId });
    }, 2000);
  };

  useEffect(() => {
    dispatch(removeNewMessagAlert(chatId));
    return () => {
      setMessages([]);
      setOldMessages([]);
      setPage(1);
      setMessage("");
    };
  }, [chatId]);

  useEffect(() => {
    // while working with this the header was going up
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.data]);

  return chatDetails.isLoading ? (
    <Skeleton sx={{ minHeight: "100vh", overflow: "visible" }} />
  ) : (
    <>
      <Stack
        ref={containerRef}
        sx={{
          boxSizing: "broder-box",
          padding: "1rem",
          spacing: "1rem",
          backgroundColor: gray,
          height: "90%",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i, index) => (
          <MessageComponent key={i._id} user={user} message={i} />
        ))}

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>
      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              rotate: "30deg",
              left: "1.5rem",
            }}
            ref={fileMenuRef}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here..."
            onChange={messageOnChange}
            value={message}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: orange,
              color: "white",
              padding: "0.5rem",
              marginLeft: "0.5rem",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
