import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";
import React, { lazy, Suspense, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutLoader } from "./components/Layouts/Loaders";
import { server } from "./ constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProtectedRoute = lazy(() =>
  import("./components/ProtectedRoute/ProtectedRoute")
);

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  // console.log(name, loader);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("success");
    // we need to use withCredential : true to send the token to the server
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => {
        // console.log(data);
        dispatch(userExists(data.user));
      })
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SocketProvider><ProtectedRoute element={<Home />} /></SocketProvider>} />
          <Route
            path="/chat/:chatId"
            element={<ProtectedRoute element={<SocketProvider><ProtectedRoute element={<Chat />} /></SocketProvider>} />}
          />
          <Route
            path="/groups"
            element={<ProtectedRoute element={<SocketProvider><ProtectedRoute element={<Groups />} /></SocketProvider>} />}
          />
          <Route path="/admin" element={<AdminLogin />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/users" element={<UserManagement />} />

          <Route path="/admin/chats" element={<ChatManagement />} />

          <Route path="/admin/messages" element={<MessageManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
