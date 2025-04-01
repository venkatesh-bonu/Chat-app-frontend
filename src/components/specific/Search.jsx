import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../ constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const [users, setUsers] = useState([]);

  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendReq] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const addFriendHandler = async (id) => {
    sendFriendRequest("Sending Friend request...",{userId : id})
  };

  const handleIsSearchClose = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    // we will use *** debouncing *** here
    // here the timerId will be cleared every time the search is mede
    // but for the last search change and after 1 sec the seach.value will be printed in the console
    // due to the clearTimeout for the last render isn't called yet.
    // the search.value will called for search query
    // like wise we are saving the numbers of unwanted calls
    const timerId = setTimeout(() => {
      console.log(search.value);
      searchUser(search.value)
        .then(({ data }) => {
          setUsers(data.users);
        })
        .catch((e) => console.log(e));
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={handleIsSearchClose}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={Search.value}
          onChange={search.changeHandler}
          variant={"outlined"}
          size={"small"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((i) => {
            return (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendReq}
              />
            );
            _;
          })}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
