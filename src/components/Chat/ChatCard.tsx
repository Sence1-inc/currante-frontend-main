import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { FirebaseUser } from "../../container/ChatPage/ChatPage";
import useGetEmployer from "../../hooks/useGetEmployer";
import useGetWorker from "../../hooks/useGetWorker";
import { useAppSelector } from "../../redux/store";
import { Employer, Worker } from "../../redux/type";

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
  const { getEmployer } = useGetEmployer();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [employer, setEmployer] = useState<Employer | null>(null);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const endpoint =
          user.logged_in_as === "worker"
            ? `/api/v1/users/${participant.user_id}?type=employer`
            : `/api/v1/users/${participant.user_id}?type=worker`;
        const { data } = await axiosInstance.get(endpoint);

        if (data) {
          console.log("Data", data);
          setParticipantUserId(
            user.logged_in_as === "worker" ? data.employer_id : data.worker_id
          );
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
      console.log(participantUserId);
      const data =
        user.logged_in_as === "worker"
          ? await getEmployer(Number(participantUserId))
          : await getWorker(Number(participantUserId));

      console.log("huhu", data);
      user.logged_in_as === "worker" ? setEmployer(data) : setWorker(data); // put this in a state
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
            {user.logged_in_as === "employer"
              ? `${worker?.profile.first_name} ${worker?.profile.last_name}`
              : `${employer?.profile.first_name} ${employer?.profile.last_name}`}
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
            .map((type, index) => (
              <Typography key={index} variant="body2">
                {type.job_type}: {type.job_name}
              </Typography>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
