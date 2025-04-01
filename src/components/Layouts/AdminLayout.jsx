import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { gray } from "../../ constants/colors";
import {
  Menu as MenuIcon,
  Close as CloseMenu,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { Navigate, useLocation } from "react-router-dom";
import { adminTabs } from "../../ constants/routes";
import { Link as LinkComponent } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout, getAdmin } from "../../redux/reducers/thunk/auth";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(adminLogout());
  };

  return (
    <Stack width={w} direction={"column"} p={"1rem"} spacing={"3rem"}>
      <Typography variant="h3" textTransform={"uppercase"}>
        Chattu
      </Typography>

      <Stack spacing={"1rem"} padding={"1rem"} alignItems={"flex-start"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "black",
                color: "white",
                ":hover": {
                  color: gray,
                },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logOutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography>Log out</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);

  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => setIsMobile((prev) => !prev);
  console.count(isAdmin);
  if (!isAdmin) return <Navigate to="/admin" />;
  console.count(isAdmin);

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          position: "fixed",
          display: { xs: "block", md: "none" },
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseMenu /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Drawer
        sx={{
          width: "50%",
          display: { md: "none" },
        }}
        open={isMobile}
        onClose={handleMobile}
      >
        <Sidebar />
      </Drawer>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: gray,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
