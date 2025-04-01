import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../ constants/sampleData";
import { fileFormat, transformImage } from "../../lib/features";
import moment from "moment";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import RenderAttachment from "../../components/shared/RenderAttachment";
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
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => {
      const { attachments } = params.row;

      if (attachments?.length == 0) return "No Attachments";

      return attachments?.map((i) => {
        const url = i.url;
        const file = fileFormat(url);
        return (
          <Box key={url}>
            <a href={url} download target="_black" style={{ color: "black" }}>
              {RenderAttachment(file, url)}
            </a>
          </Box>
        );
      });

      return <Avatar alt={params.row.name} src={params.row.avatar} />;
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent by",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        spacing={"0.5rem"}
      >
        <Avatar alt={params.row.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 200,
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  const getMessagesData = useMutation({
    url: `${server}/api/v1/admin/messages`,
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
    getMessagesData.trigger();
  }, []);

  const { data, loading, error } = getMessagesData;

  const { messages = [] } = data || {};

  useEffect(() => {
    setRows(
      messages.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },
        createdAt: moment(i.createdAt).format("MMMM Do YYYY,h:mm:ss a"),
        attachments: i.attachements,
      }))
    );
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"}  />
      ) : (
        <Table
          heading={"All Messages"}
          rows={rows}
          columns={columns}
          rowHeight={250}
        />
      )}
    </AdminLayout>
  );
};

export default MessageManagement;
