import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/store";
import { User } from "../../redux/type";

interface ChatBubbleProps {
  message: string;
  user_id: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, user_id }) => {
  const u: User = useAppSelector((state) => state.user);
  console.log(u, user_id);
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        padding: "14px",
        flexDirection: user_id !== u.id ? "row" : "row-reverse",
      }}
    >
      <Avatar
        sx={{
          width: "40px",
          height: "40px",
          alignSelf: "center",
        }}
        src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <Paper
        sx={{
          display: "inline-block",
          maxWidth: "70%",
          marginBottom: "10px",
          padding: "16px",
          borderRadius: "10px",
          backgroundColor:
            user_id !== u.id ? "background.paper" : "primary.light",
          color: "common.black",
          width: "50vw",
        }}
      >
        <Typography>{message}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatBubble;
