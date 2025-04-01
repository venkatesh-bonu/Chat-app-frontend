import React from "react";
import AppLayout from "../components/Layouts/AppLayout";
import Cookies from "js-cookie";
import { Box, Typography } from "@mui/material";
import { gray } from "../ constants/colors";

// import AppLayout from '../components/Layouts/AppLayout'

const Home = () => {
  return (
    <Box bgcolor={gray} height={"100%"}>
      <Typography p={"2rem"} variant={"h5"} textAlign={"center"}>
        Select a Friend to Chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
