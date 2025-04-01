import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";
const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} controls preload="none" width="200px" />;
    case "image":
      return (
        <img
          src={transformImage(url,200)}
          alt="attachment"
          width="200px"
          style={{
            objectFit: "contain",
          }}
        />
      );
    case "audio":
      return <audio src={url} preload="none" controls />;
    default:
      return <FileOpenIcon src = {url} target = "_blank" />;
  }
};

export default RenderAttachment;
