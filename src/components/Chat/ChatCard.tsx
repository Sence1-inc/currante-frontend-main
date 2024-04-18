import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { FirebaseUser } from "../../container/ChatPage/ChatPage";
import useGetWorker from "../../hooks/useGetWorker";
import { Worker } from "../../redux/type";

interface ChatCardProps {
  handleCardClick: () => void;
  participant: FirebaseUser;
}

const ChatCard: React.FC<ChatCardProps> = ({
  participant,
  handleCardClick,
}) => {
  const [participantUserId, setParticipantUserId] = useState<number | null>(
    null
  );
  const { getWorker } = useGetWorker();
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/v1/users/${participant.user_id}?type=worker`
        );

        if (data) {
          setParticipantUserId(data.worker_id);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (participant) {
      getUser(); // make this a hook
    }
  }, [participant]);

  useEffect(() => {
    const getData = async () => {
      const data = await getWorker(Number(participantUserId));
      setWorker(data); // put this in a state
    };
    if (participantUserId) {
      getData();
    }
  }, [participantUserId]);

  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "12px",
        padding: "16px",
        height: "100px",
        border: "1px #C5C6D0 solid",
        boxShadow: "none",
      }}
      onClick={handleCardClick}
    >
      <Avatar
        sx={{ width: "40px", height: "40px", alignSelf: "center" }}
        src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h6">
            {participant.first_name} {participant.last_name}
          </Typography>
          <Typography variant="subtitle1">Pasig City</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {worker?.profile.job_subtypes
            .filter((type) => type.active_flg)
            .map((type) => (
              <Typography variant="body2">
                {type.job_type}: {type.job_name}
              </Typography>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
