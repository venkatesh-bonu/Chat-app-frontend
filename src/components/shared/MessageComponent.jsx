import { Box, Typography } from "@mui/material";
import { lightBlue } from "../../ constants/colors";
import React, { memo } from "react";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  // console.log(message)
  const { sender, content, attachements = [], createdAt } = message;
  // console.log(message)
  const sameSender = sender._id === user._id;
  // console.log(sameSender)
  const timeAgo = moment(createdAt).fromNow();
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
        marginTop: "5px",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}
      <Typography>{content}</Typography>

      {attachements.length > 0 &&
        attachements.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color="text.secondary">
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
