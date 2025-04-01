import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "../../ constants/colors";
import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogOutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import axios from "axios";
import { server } from "../../ constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import toast from "react-hot-toast";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotifications } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const IconBtn = (title, icon, onClick, value) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

const Header = () => {
  const { isSearch, isNotification } = useSelector((state) => state.misc);
  const { notificationsCount } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.misc);
  const navigate = useNavigate();

  const { isNewGroup } = useSelector((state) => state.misc);

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };
  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotifications());
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      const { data } = response;
      dispatch(userNotExists());
      toast.success(data.message);
      console.log("success")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
      console.log(error);
    }
  };

  const navigateToGroup = () => navigate("/groups");

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Chattu
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              {IconBtn("search", <SearchIcon />, openSearch)}
              {IconBtn("New group", <AddIcon />, openNewGroup)}
              {IconBtn("search", <GroupIcon />, navigateToGroup)}
              {IconBtn(
                "Notification",
                <NotificationsIcon />,
                openNotification,
                notificationsCount
              )}
              {IconBtn("Logout", <LogOutIcon />, logoutHandler)}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;
