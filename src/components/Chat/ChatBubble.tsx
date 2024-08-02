import { CheckCircle } from "@mui/icons-material";
import { Avatar, Badge, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../redux/store";
import { User } from "../../redux/type";

interface ChatBubbleProps {
  message: string;
  user_id: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, user_id }) => {
  const u: User = useAppSelector((state) => state.user);
  const otherUser = useAppSelector((state) => state.participantData);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        padding: "14px",
        flexDirection: user_id !== u.id ? "row" : "row-reverse",
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          (user_id !== u.id && otherUser?.is_identification_verified) ||
          (user_id === u.id && u?.is_identification_verified) ? (
            <CheckCircle color="success" />
          ) : (
            <></>
          )
        }
      >
        <Avatar
          sx={{
            width: "40px",
            height: "40px",
            alignSelf: "center",
          }}
          src={user_id !== u.id ? otherUser?.id_photo : u.id_photo}
        />
      </Badge>

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
