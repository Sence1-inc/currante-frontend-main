import { Box, Card, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import ProfileImage from "../../assets/profile.png";
import { useAppSelector } from "../../redux/store";
import { Order } from "../../redux/type";
import jobListStyles from "../../styles/jobListStyles";
import TabButton from "./TabButton";
import TabModal from "./TabModal";

interface TabCardProps {
  order: Order;
}

const TabCard: React.FC<TabCardProps> = ({ order }) => {
  const user = useAppSelector((state) => state.user);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [createdDate, setCreatedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [completedDate, setCompletedDate] = useState<Date | null>(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const renderStatus = () => {
    const status = Number(order.status);
    const statusMap: { [key: number]: string } = {
      1: "request",
      2: "incoming",
      3: "arrived",
      4: "completed",
      7: "released",
    };

    if (statusMap[status]) {
      return statusMap[status];
    } else if (
      (status === 5 && user.logged_in_as === "worker") ||
      (status === 6 && user.logged_in_as === "employer") ||
      order.payment_approval_date !== null
    ) {
      return "reviewed";
    } else {
      return "all";
    }
  };

  // const renderStatus = () => {
  //   if (Number(order.status) === 1) {
  //     return "request";
  //   } else if (Number(order.status) === 2) {
  //     return "incoming";
  //   } else if (Number(order.status) === 3) {
  //     return "arrived";
  //   } else if (Number(order.status) === 4) {
  //     return "completed";
  //   } else if (
  //     (Number(order.status) === 5 && user.logged_in_as == "worker") ||
  //     order.payment_approval_date !== null
  //   ) {
  //     return "reviewed";
  //   } else if (
  //     (Number(order.status) === 6 && user.logged_in_as == "employer") ||
  //     order.payment_approval_date !== null
  //   ) {
  //     return "reviewed";
  //   } else if (Number(order.status) === 7) {
  //     return "released";
  //   } else {
  //     return "all";
  //   }
  // };

  useEffect(() => {
    if (order.job_order_start_date) {
      setStartDate(parseISO(order.job_order_start_date));
    }

    if (order.created_at) {
      setCreatedDate(parseISO(order.created_at));
    }

    if (order.job_order_completed_date) {
      setCompletedDate(parseISO(order.job_order_completed_date));
    }
  }, [
    order.created_at,
    order.job_order_start_date,
    order.job_order_completed_date,
  ]);

  return (
    <Card sx={jobListStyles.container.cardContainer}>
      <Box>
        <Typography sx={jobListStyles.card.cardStatusText}>
          {capitalizeFirstLetter(renderStatus())}
        </Typography>
      </Box>
      <Box sx={jobListStyles.card.cardContentBox}>
        <Box sx={jobListStyles.card.cardImageBox}>
          <Box sx={{ marginBottom: "5px" }}>
            <img src={ProfileImage} alt="" />
          </Box>
        </Box>
        <Box sx={jobListStyles.card.cardDetailsBox}>
          <Typography sx={jobListStyles.card.cardHeading}>
            {user.logged_in_as === "worker"
              ? order.employer_name
              : order.worker_name}
          </Typography>
          {user.logged_in_as === "employer" &&
            user.orders.find(
              (orderItem) => orderItem.id === order.id && orderItem.otp
            ) && (
              <Typography sx={jobListStyles.card.cardSubHeading}>
                OTP:{" "}
                {
                  user.orders.find(
                    (orderItem) => orderItem.id === order.id && orderItem.otp
                  )?.otp
                }
              </Typography>
            )}
          {user.logged_in_as === "worker" && (
            <Typography sx={jobListStyles.card.cardSubHeading}>
              {order.employer_address}
            </Typography>
          )}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {createdDate && (
              <Typography sx={jobListStyles.card.cardText}>
                Created on{" "}
                {format(createdDate as Date, "MMMM d, yyyy, h:mm aa")}
              </Typography>
            )}
            {startDate && (
              <Typography sx={jobListStyles.card.cardText}>
                Job start date{" "}
                {format(startDate as Date, "MMMM d, yyyy, h:mm aa")}
              </Typography>
            )}
            {completedDate && (
              <Typography sx={jobListStyles.card.cardText}>
                Job completed date{" "}
                {format(completedDate as Date, "MMMM d, yyyy, h:mm aa")}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={jobListStyles.card.cardIdBox}>
          <Typography sx={jobListStyles.card.cardTextLight}>
            #{order.job_order_code}
          </Typography>
        </Box>
      </Box>
      <TabButton
        order={order}
        status={order.status}
        handleOpenModal={handleOpenModal}
      />
      <TabModal
        order={order}
        status={order.status}
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </Card>
  );
};

export default TabCard;
