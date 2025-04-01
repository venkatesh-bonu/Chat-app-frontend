import { Avatar, AvatarGroup, Stack } from "@mui/material";
import React from "react";
import {v4 as uuidv4} from "uuid"
import { transformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 3 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}  width = {"60px"}>
      <AvatarGroup max={max}>
        {avatar.map((i, index) => (
          <div key = {index} style = {{position : "relative",display:"flex",alignItems:"center"}}>
            <Avatar
            src={transformImage(avatar.length === 1 ? i.url : i)}
            alt={`Avatar ${index}`}
            sx={{
              width: "2",
              height: "2rem",
              position : "absolute",
              left : {
                xs : `${0.5+index}rem`,
                sm : `${index}rem`
              },
              
            }}
          />
          </div>
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
