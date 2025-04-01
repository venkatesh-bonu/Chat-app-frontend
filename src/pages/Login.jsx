import React, { useEffect, useState } from "react";
import { LoginContainer, LoginForm, VisuallyHidden } from "../styledComponents";
import {
  userNameValidation,
  useStrongPassword,
  useValidName,
  validatePhoto,
} from "../validations/inputValidations.js";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";

import Cookies from "js-cookie";

import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { useFileHandler } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import { userExists } from "../redux/reducers/auth.js";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../ constants/config.js";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const avatar = useFileHandler("single", 2);

  const [isLogin, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [errorMsgs, setErrorMsgs] = useState({
    usernameErr: "",
    passwordErr: "",
    bioErr: "",
    nameErr: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to="/" />;
    // window.location.reload();
  }

  const onChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const toggleLogin = () => {
    setLogin((prevState) => !prevState);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeBio = (event) => {
    setBio(event.target.value);
  };

  const renderLoginInputFields = () => {
    const { usernameErr, passwordErr } = errorMsgs;
    return (
      <>
        <TextField
          required
          fullWidth
          value={username}
          label="Username"
          margin="normal"
          valrian="outline"
          onChange={onChangeUserName}
        />
        <Typography
          variant="p"
          sx={{ color: "red", fontSize: "13px", alignSelf: "flex-start" }}
        >
          {usernameErr}
        </Typography>
        <TextField
          required
          fullWidth
          value={password}
          label="Password"
          type="password"
          margin="normal"
          valrian="outline"
          onChange={onChangePassword}
        />
        <Typography
          variant="p"
          sx={{ color: "red", fontSize: "13px", alignSelf: "flex-start" }}
        >
          {passwordErr}
        </Typography>
      </>
    );
  };

  const renderSignUpField = () => {
    const { nameErr, bioErr, usernameErr, passwordErr } = errorMsgs;
    return (
      <>
        <Stack position={"relative"} width={"10rem"} margin={"auto"}>
          <Avatar
            sx={{
              width: "10rem",
              height: "10rem",
              objectFit: "contain",
            }}
            src={avatar.preview}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            component="label"
          >
            <>
              <CameraAltIcon sx={{ fontSize: "20px" }} />
              <VisuallyHidden
                type="file"
                onChange={avatar.changeHandler}
                hidden
              />
            </>
          </IconButton>
        </Stack>
        {avatar.error && (
          <Typography color="error" variant="caption">
            {avatar.error}
          </Typography>
        )}
        <TextField
          required
          fullWidth
          value={name}
          label="Name"
          margin="normal"
          valrian="outline"
          onChange={onChangeName}
        />
        <Typography
          variant="p"
          sx={{ color: "red", fontSize: "13px", alignSelf: "flex-start" }}
        >
          {nameErr}
        </Typography>
        <TextField
          required
          fullWidth
          value={bio}
          label="Bio"
          margin="normal"
          valrian="outline"
          onChange={onChangeBio}
        />
        <Typography
          variant="p"
          sx={{ color: "red", fontSize: "13px", alignSelf: "flex-start" }}
        >
          {bioErr}
        </Typography>
        <TextField
          required
          fullWidth
          value={username}
          label="Username"
          margin="normal"
          valrian="outline"
          onChange={onChangeUserName}
        />
        <Typography
          variant="p"
          sx={{ color: "red", fontSize: "13px", alignSelf: "flex-start" }}
        >
          {usernameErr}
        </Typography>
        <TextField
          required
          fullWidth
          value={password}
          label="Password"
          type="password"
          margin="normal"
          valrian="outline"
          onChange={onChangePassword}
        />
        <Typography
          variant="p"
          sx={{ color: "red", fontSize: "13px", alignSelf: "flex-start" }}
        >
          {passwordErr}
        </Typography>
      </>
    );
  };

  const onSubmitLogin = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    let usernameErr = userNameValidation(username);
    let passwordErr = useStrongPassword(password);
    setErrorMsgs({
      usernameErr,
      passwordErr,
    });
    if (usernameErr !== "" || passwordErr !== "") return;

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { username, password },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitSignUp = async (event) => {
    event.preventDefault();
    let usernameErr = userNameValidation(username);
    let passwordErr = useStrongPassword(password);
    let bioErr = useValidName(bio);
    let nameErr = useValidName(name);
    setErrorMsgs({
      usernameErr,
      passwordErr,
      bioErr,
      nameErr,
    });
    setIsLoading(true);
    if (
      usernameErr !== "" ||
      passwordErr !== "" ||
      bioErr !== "" ||
      nameErr !== ""
    )
      return;

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("username", username);
    formData.append("password", password);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      console.log(data.user);
      dispatch(userExists(data.user));
      toast.success(data.message);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: "10px",
        }}
      >
        <LoginForm onSubmit={isLogin ? onSubmitLogin : onSubmitSignUp}>
          <Typography
            variant="h1"
            sx={{ fontSize: "25px", marginBottom: "15px" }}
          >
            {isLogin ? "Login" : "SignUp"}
          </Typography>

          {isLogin ? renderLoginInputFields() : renderSignUpField()}

          <Button
            sx={{ marginTop: "20px" }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLogin ? "Login" : "SignUp"}
          </Button>

          <Typography sx={{ marginTop: "10px" }}>OR</Typography>

          {isLogin ? (
            <Button
              sx={{ marginTop: "10px", color: "blue" }}
              variant="container"
              color="secondary"
              fullWidth
              onClick={toggleLogin}
              disabled={isLoading}
            >
              SignUp Instead
            </Button>
          ) : (
            <Button
              sx={{ marginTop: "10px", color: "blue" }}
              fullWidth
              variant="container"
              color="secondary"
              onClick={toggleLogin}
            >
              Login Instead
            </Button>
          )}
        </LoginForm>
      </Paper>
    </LoginContainer>
  );
};

export default Login;
