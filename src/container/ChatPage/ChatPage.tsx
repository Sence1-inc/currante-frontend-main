import {
  collection,
  doc as document,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChatCard from "../../components/Chat/ChatCard";
import { db } from "../../firebase";
import { useAppSelector } from "../../redux/store";

export interface FirebaseUser {
  user_id: number;
  uuid: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

export interface Conversation {
  conversation_id: string;
  users: FirebaseUser[];
}

const ChatPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const getUser = async () => {
          const userRef = query(
            collection(db, "users"),
            where("user_id", "==", userState.id) // update during authentication implementation
          );
          const users = await getDocs(userRef);
          const docRef = users.docs[0].ref;

          const userDoc = await getDoc(docRef);
          return userDoc.exists() ? userDoc.id : null;
        };

        const firebaseUserId = await getUser();

        const userConversationsRef = query(
          collection(db, "conversation_participants"),
          where("user_id", "==", firebaseUserId)
        );
        const userConversations = await getDocs(userConversationsRef);

        const conversations: {
          conversation_id: string;
          users: FirebaseUser[];
        }[] = [];

        const getConversations = async (conversationId: string) => {
          const conversationsRef = query(
            collection(db, "conversation_participants"),
            where("conversation_id", "==", conversationId)
          );

          const conversationsSnapshot = await getDocs(conversationsRef);

          return conversationsSnapshot.docs.map((doc) => doc.data());
        };

        for (const doc of userConversations.docs) {
          const conversationId = doc.data().conversation_id;

          let conversation = conversations.find(
            (conv) => conv.conversation_id === conversationId
          );

          if (!conversation) {
            const allUserConversations = await getConversations(conversationId);

            const usersPromises = allUserConversations.map(async (convo) => {
              const userRef = document(db, "users", convo.user_id);
              const userDoc = await getDoc(userRef);
              return userDoc.exists() ? (userDoc.data() as FirebaseUser) : null;
            });

            const users = (await Promise.all(usersPromises)).filter(
              (user) => user !== null
            ) as FirebaseUser[];

            conversation = {
              conversation_id: conversationId,
              users: users.filter((user) => user !== null),
            };

            conversations.push(conversation as Conversation);
          }
        }

        setConversations(conversations);
      } catch (error) {
        console.error("Error fetching conversations: ", error);
      }
    };

    fetchConversations();
  }, []);

  const handleCardClick = (conversationId: string) => {
    navigate(`/chat/${conversationId}`);
  };

  return (
    <Box
      sx={{
        marginTop: "64px",
        marginBottom: "84px",
        padding: "20px 10px 30px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          padding: "10px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          position: "sticky",
          zIndex: 10,
          top: "64px",
          backgroundColor: "background.default",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          sx={{
            backgroundColor: "primary.light",
            borderRadius: "12px",
            fontSize: "12px",
            width: "190px",
            "& fieldset": {
              borderRadius: "12px",
            },
          }}
          InputProps={{
            sx: {
              color: "secondary.dark",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "secondary.dark" }}
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {conversations.map((conversation: Conversation) => {
        const user = conversation.users.filter(
          (user) => user.user_id !== userState.id // update during implementation of authentication
        );

        const participant = user[0];
        return (
          <ChatCard
            key={participant.user_id}
            participant={participant}
            handleCardClick={() => {
              handleCardClick(conversation.conversation_id);
            }}
          />
        );
      })}
    </Box>
  );
};

export default ChatPage;
