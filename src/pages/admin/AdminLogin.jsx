import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoginContainer, LoginForm } from "../../styledComponents.js";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/reducers/thunk/auth.js";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const secretKey = useInputValidation();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(secretKey.value);

    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);


  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <LoginContainer>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: "10px",
        }}
      >
        <LoginForm onSubmit={submitHandler}>
          <Typography
            variant="h1"
            sx={{ fontSize: "25px", marginBottom: "15px" }}
          >
            Admin Login
          </Typography>

          <TextField
            required
            fullWidth
            value={secretKey.value}
            label="Password"
            type="password"
            margin="normal"
            valrian="outline"
            onChange={secretKey.changeHandler}
          />

          <Button
            sx={{ marginTop: "20px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </LoginForm>
      </Paper>
    </LoginContainer>
  );
};

export default AdminLogin;
