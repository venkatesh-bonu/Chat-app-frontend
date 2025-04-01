import React from "react";
import { Stack, Typography } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";
const NotFound = () => {
  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      spacing={"2rem"}
    >
      <ErrorIcon style={{ fontSize: "120px" }} />
      <Typography variant="h1" fontSize={"50px"}>
        Page Not Found
      </Typography>
      <a href="/">Go back to Home</a>
    </Stack>
  );
};

export default NotFound;
