import {
  collection,
  doc as document,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { FirebaseUser } from "../../container/ChatPage/ChatPage";
import { db } from "../../firebase";
import { useAppSelector } from "../../redux/store";
import FabButton from "../FabButton/FabButton";
import ChatBox from "./ChatBox";
import SendChat from "./SendChat";

const ChatRoom: React.FC = () => {
  const { conversation_id } = useParams();
  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [participant, setParticipant] = useState<FirebaseUser | null>(null);
  const [workerId, setWorkerId] = useState<number | null>(null);

  useEffect(() => {
    if (conversation_id) {
      const getConversations = async (conversationId: string) => {
        const conversationsRef = query(
          collection(db, "conversation_participants"),
          where("conversation_id", "==", conversationId)
        );

        const conversationsSnapshot = await getDocs(conversationsRef);

        return conversationsSnapshot.docs.map((doc) => doc.data());
      };

      const getParticipant = async () => {
        const allUserConversations = await getConversations(
          conversation_id as string
        );
        const usersPromises = allUserConversations.map(async (convo) => {
          const userRef = document(db, "users", convo.user_id);
          const userDoc = await getDoc(userRef);
          return userDoc.exists() ? (userDoc.data() as FirebaseUser) : null;
        });

        const user = (await Promise.all(usersPromises)).filter((user) => {
          return user !== null && user.user_id !== userState.id;
        }) as FirebaseUser[];

        setParticipant(user[0]);
      };

      getParticipant();
    }
  }, [conversation_id]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/v1/users/${participant?.user_id}?type=worker`
        );

        if (data) {
          setWorkerId(data.worker_id);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (participant) {
      getUser(); // make this a hook
    }
  }, [participant]);

  const handleHire = () => {
    navigate(`/workers/${workerId}/payment`);
  };

  return (
    <Box
      sx={{
        marginTop: "64px",
        marginBottom: "84px",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: "10px 15px",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          zIndex: 10,
          top: "64px",
          backgroundColor: "background.default",
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1">You are chatting with</Typography>
          <Typography variant="body1">
            {participant?.first_name} {participant?.last_name}
          </Typography>
        </Box>
      </Box>

      <FabButton
        text="Hire"
        icon={<PaymentIcon />}
        handleClick={handleHire}
        styles={{
          bottom: "170px",
          right: "36%",
        }}
      />

      <ChatBox conversation_id={conversation_id} />
      <SendChat conversation_id={conversation_id} />
    </Box>
  );
};

export default ChatRoom;
