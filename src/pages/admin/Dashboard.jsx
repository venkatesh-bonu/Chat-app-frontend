import React, { useEffect } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import moment from "moment";

import { CurveButton, SearchField } from "../../styledComponents";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";

import { useFetchData, useMutation } from "6pp";
import { server } from "../../ constants/config";
import { LayoutLoader } from "../../components/Layouts/Loaders.jsx";

const Appbar = (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
    }}
  >
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
      <SearchField placeholder="Search..." />
      <CurveButton>Search</CurveButton>
      <button>sdf</button>
      <Box flexGrow={1}></Box>
      <Typography display={{ xs: "none", md: "block" }}>
        {moment().format("MMMM Do YYYY")}
      </Typography>
      <NotificationsIcon />
    </Stack>
  </Paper>
);
const Widget = ({ title, value, Icon }) => (
  <Paper
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "20rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid rgba(0,0,0,0.9)`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

const Widgets = (
  <Stack
    direction={{
      xs: "column",
      sm: "row",
    }}
    spacing={"2rem"}
    justifyContent={"space-between"}
    alignItems={"center"}
    margin={"2rem 0"}
  >
    <Widget title={"Users"} value={34} Icon={<PersonIcon />} />
    <Widget title={"Chats"} value={3} Icon={<GroupIcon />} />
    <Widget title={"Messages"} value={453} Icon={<MessageIcon />} />
  </Stack>
);

const Dashboard = () => {
  const getDashboardData = useMutation({
    url: `${server}/api/v1/admin/stats`,
    method: "GET",
    credentials: "include",
    key: "dashboard-stats",
    successCallback: (data) => {
      console.log("dashboard stats success", data);
    },
    errorCallback: (error) => {
      console.log("dashboard stats failure", error);
    },
  });

  useEffect(() => {
    getDashboardData.trigger();
  }, []);

  const { data, loading, error } = getDashboardData;

  const { stats = {} } = data || {};

  const {
    groupsCount = 0,
    messagesChart = [],
    totalChatsCount = 0,
    usersCount = 0,
  } = stats;

  return loading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={"2rem"}
          flexWrap={"wrap"}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: " 100%",
              maxWidth: "45rem",
            }}
          >
            <Typography variant="h5">Last Messages</Typography>
            <LineChart value={messagesChart} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
              height: "25rem",
            }}
          >
            <DoughnutChart
              labels={["Single chats", "Group Chats"]}
              value={[23, 66]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
