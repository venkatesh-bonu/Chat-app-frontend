import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Skeleton } from "@mui/material";
import { dashboardData } from "../../ constants/sampleData";
import { transformImage } from "../../lib/features";
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
    headerName: "AVATAR",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "NAME",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  const gerUserManagementData = useMutation({
    url: `${server}/api/v1/admin/users`,
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
    gerUserManagementData.trigger();
  }, []);

  const { data, loading, error } = gerUserManagementData;

  const { users = [] } = data || {};

  useEffect(() => {
    setRows(
      users.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
      }))
    );
  }, [users]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table rows={rows} columns={columns} heading={"All Users"} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
