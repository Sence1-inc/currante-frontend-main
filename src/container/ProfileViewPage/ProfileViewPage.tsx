import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import ChatIcon from "@mui/icons-material/Chat";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../../axiosInstance";
import DescriptionCard from "../../components/DescriptionCard/DescriptionCard";
import ReviewsCard from "../../components/DescriptionCard/ReviewsCard";
import FabButton from "../../components/FabButton/FabButton";
import { db } from "../../firebase";
import { useAppSelector } from "../../redux/store";
import { Review, User, Worker } from "../../redux/type";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 1",
  },
  {
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "Slide 2",
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 3",
  },
];

const ProfileViewPage: React.FC = () => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const user: User = useAppSelector((state) => state.user);
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getWorker = async () => {
      const response = await axiosInstance.get(`/api/v1/workers/${id}`);
      setWorker(response.data);
    };

    getWorker();
  }, []);

  const renderPrices = () => {
    const jobs = worker?.profile.job_subtypes.filter((type) => type.active_flg);

    let formattedJobs: string[] = [];

    jobs?.forEach((job) => {
      formattedJobs.push(`${job.job_name}: ${job.total_price} ${job.unit}`);
    });

    return formattedJobs.join(", ");
  };

  const handleMessageClick = async () => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    } else {
      const conversationRef = query(
        collection(db, "conversations"),
        where("created_by", "==", user.id),
        where("created_for", "==", worker?.profile.id)
      );

      const conversations = await getDocs(conversationRef);

      if (conversations.empty) {
        try {
          const conversationsRef = collection(db, "conversations");
          const conversationParticipantRef = collection(
            db,
            "conversation_participants"
          );

          const docRef = await addDoc(conversationsRef, {
            conversation_name: `Conversation by ${user.id} with ${worker?.profile.id}`,
            created_by: user.id,
            created_for: worker?.profile.id,
          });

          const employerRef = query(
            collection(db, "users"),
            where("user_id", "==", user.id)
          );
          const employers = await getDocs(employerRef);
          const employerDocRef = employers.docs[0].ref;
          const employerDoc = await getDoc(employerDocRef);

          const workerRef = query(
            collection(db, "users"),
            where("user_id", "==", worker?.profile.id)
          );
          const workers = await getDocs(workerRef);
          const workerDocRef = workers.docs[0].ref;
          const workerDoc = await getDoc(workerDocRef);

          if (docRef.id) {
            const employerConversationParticipantDocRef = await addDoc(
              conversationParticipantRef,
              {
                conversation_id: docRef.id,
                user_id: employerDoc.id,
              }
            );
            const workerConversationParticipantDocRef = await addDoc(
              conversationParticipantRef,
              {
                conversation_id: docRef.id,
                user_id: workerDoc.id,
              }
            );

            if (
              employerConversationParticipantDocRef.id &&
              workerConversationParticipantDocRef.id
            ) {
              navigate(`/chat/${docRef.id}`);
            }
          }
        } catch (error) {
          console.log("Error chat", error);
        }
      } else {
        const conversationRef = query(
          collection(db, "conversations"),
          where("created_by", "==", user.id),
          where("created_for", "==", worker?.profile.id)
        );

        const conversations = await getDocs(conversationRef);
        const conversationDocRef = conversations.docs[0].ref;
        navigate(`/chat/${conversationDocRef.id}`);
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: "64px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {worker === undefined || worker === null ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box>
            <Carousel
              swipeable={true}
              draggable={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
            >
              {slideImages.map((slideImage, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundSize: "cover",
                      height: "200px",
                      borderRadius: "4px",
                      backgroundImage: `url(${slideImage.url})`,
                    }}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
          <DescriptionCard
            image={worker?.profile.id_photo}
            title={`${worker?.profile.first_name} ${worker?.profile.last_name}`}
            description={worker?.profile.role.role_details as string}
            rating={worker.profile.overall_rating as number}
            isIdentificationVerified={worker.profile.is_identification_verified}
          />
          <DescriptionCard
            title="Work Details"
            description={worker?.profile.description as string}
          />
          <DescriptionCard title="Pricing" description={renderPrices()} />
          <DescriptionCard
            title="Business Hours"
            description={worker?.profile.schedule as string}
          />
          <ReviewsCard reviews={worker?.profile.reviews as Review[]} />
          <FabButton
            styles={{
              bottom: isAuthenticated ? "12%" : "10%",
              right: "30%",
            }}
            handleClick={handleMessageClick}
            text="Message"
            icon={<ChatIcon />}
          />
        </>
      )}
    </Box>
  );
};

export default ProfileViewPage;
