import { collection, getDoc, getDocs, query, where } from "@firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField } from "@mui/material";
import { addDoc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { LOGGED_IN_USER } from "../../data/WorkerDetails";
import { db } from "../../firebase";

interface SendChatProps {
  conversation_id?: string;
}

const SendChat: React.FC<SendChatProps> = ({ conversation_id }) => {
  const [chat, setChat] = useState<string>("");

  const handleSendChat = async () => {
    setChat("");

    try {
      const userRef = query(
        collection(db, "users"),
        where("user_id", "==", LOGGED_IN_USER) // update during authentication implementation
      );
      const users = await getDocs(userRef);
      const docRef = users.docs[0].ref;

      const userDoc = await getDoc(docRef);

      await addDoc(collection(db, "messages"), {
        body: chat,
        user_id: LOGGED_IN_USER, // update this during implementation of authentication
        conversation_id: conversation_id,
        created_at: serverTimestamp(),
        sender_id: userDoc.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        padding: "12px",
        position: "fixed",
        bottom: "80px",
        width: "100%",
        backgroundColor: "primary.light",
      }}
    >
      <TextField
        multiline
        minRows={1}
        id="outlined-basic"
        variant="outlined"
        sx={{ width: "83%" }}
        InputProps={{
          style: {
            borderRadius: "16px",
            backgroundColor: "white",
          },
        }}
        value={chat}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setChat(e.target.value)
        }
      />
      <IconButton disabled={!chat} onClick={handleSendChat}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default SendChat;
