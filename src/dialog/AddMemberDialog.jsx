import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserItem from "../components/shared/UserItem";
import { sampleUsers } from "../ constants/sampleData";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useAddMemberMutation,
  useAvaliableFriendsQuery,
} from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { isAddMember } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isLoading, data, isError, error } = useAvaliableFriendsQuery(chatId);

  const [addMembers, isLoadingAddMembers] =
    useAsyncMutation(useAddMemberMutation);

  const addFriendHandler = () => {
    // addMembers(id, chatId);
  };

  const selectMemeberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addMemeberSubmitHandler = () => {
    addMembers("Adding members", { chatId, members: selectedMembers });
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"} flexGrow={1}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        {data?.availableFriends?.length > 0 ? (
          <Stack spacing={"1rem"}>
            {isLoading ? (
              <Skeleton />
            ) : (
              data?.availableFriends?.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={selectMemeberHandler}
                  isAdded={selectedMembers.includes(i._id)}
                />
              ))
            )}
          </Stack>
        ) : (
          <Typography textAlign={"center"}>No Friends</Typography>
        )}
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        padding={"2rem"}
      >
        <Button onClick={closeHandler} color="error">
          Cancel
        </Button>
        <Button
          onClick={addMemeberSubmitHandler}
          variant="contained"
          disabled={isLoadingAddMembers}
        >
          Submit Changes
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
