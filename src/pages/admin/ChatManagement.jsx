import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Container, Skeleton, Stack } from "@mui/material";
import { dashboardData } from "../../ constants/sampleData";
import { transformImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";
import { useMutation } from "6pp";
import { server } from "../../ constants/config";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Container sx={{ position: "relative", padding: "1rem 2rem" }}>
        <AvatarCard avatar={params.row.avatar} />
      </Container>
    ),
  },
  {
    field: "name",
    headerName: "NAME",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <Container sx={{ position: "relative", padding: "1rem 2rem" }}>
        <AvatarCard max={100} avatar={params.row.members} />
      </Container>
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => {
      return (
        <Stack direction={"row"} alignItems={"Center"} spacing={"1rem"}>
          <Avatar
            alt={params.row.creator.name}
            src={params.row.creator.avatar}
          />
          <span>{params.row.creator.name}</span>
        </Stack>
      );
    },
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  const getChatManagementData = useMutation({
    url: `${server}/api/v1/admin/chats`,
    method: "GET",
    credentials: "include",
    key: "dashboard-stats",
    successCallback: (data) => {
      console.log("user managemetn api success", data);
    },
    errorCallback: (error) => {
      console.log("user managemetn api failure", error);
    },
  });

  useEffect(() => {
    getChatManagementData.trigger();
  }, []);

  const { data, loading, error } = getChatManagementData;

  const { chats = [] } = data || {};

  useEffect(() => {
    setRows(
      chats.map((i) => ({
        ...i,
        id: i._id,
        avatar: i.avatar.map((i) => transformImage(i, 50)),
        members: i.members.map((i) => transformImage(i.avatar, 50)),
      }))
    );
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table rows={rows} columns={columns} heading={"All Chats"} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
