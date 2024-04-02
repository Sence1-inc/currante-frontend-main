import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import SendChat from "./SendChat";

const ChatRoom: React.FC = () => {
  const { conversation_id } = useParams();

  return (
    <Box
      sx={{
        margin: "64px 0",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatBox conversation_id={conversation_id} />
      <SendChat conversation_id={conversation_id} />
    </Box>
  );
};

export default ChatRoom;
