import { Box } from "@mui/material";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import ChatBubble from "./ChatBubble";

interface Message {
  body: string;
  id: string;
  user_id: number;
}

interface ChatBoxProps {
  conversation_id?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ conversation_id }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<Message[] | []>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chats]);

  useEffect((): any => {
    const q = query(
      collection(db, "messages"),
      where("conversation_id", "==", conversation_id),
      orderBy("created_at")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: any = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setChats(messages);
    });

    return () => unsubscribe;
  }, []);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "92px" }}>
      {chats.map((chat) => {
        return (
          <ChatBubble
            key={chat.id}
            message={chat.body}
            user_id={chat.user_id}
          />
        );
      })}
      <div ref={messagesEndRef}></div>
    </Box>
  );
};

export default ChatBox;
