import { Box, Card, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import ProfileImage from "../../assets/profile.png";
import { Order } from "../../redux/type";
import jobListStyles from "../../styles/jobListStyles";
import TabButton from "./TabButton";
import TabModal from "./TabModal";

interface TabCardProps {
  order: Order;
}

const TabCard: React.FC<TabCardProps> = ({ order }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [createdDate, setCreatedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

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
    if (Number(order.status) === 1) {
      return "incoming";
    } else if (Number(order.status) === 2) {
      return "current";
    } else if (Number(order.status) === 3) {
      return "completed";
    } else {
      return "all";
    }
  };

  useEffect(() => {
    if (order.job_order_start_date) {
      setStartDate(parseISO(order.job_order_start_date));
    }

    if (order.created_at) {
      setCreatedDate(parseISO(order.created_at));
    }
  }, [order.created_at, order.job_order_start_date]);

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
          <Typography sx={jobListStyles.card.cardText}>
            {order.employer_name}
          </Typography>
        </Box>
        <Box sx={jobListStyles.card.cardDetailsBox}>
          <Typography sx={jobListStyles.card.cardHeading}>
            {order.employer_name}
          </Typography>
          <Typography sx={jobListStyles.card.cardSubHeading}>
            Quezon City
          </Typography>
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
          </Box>
        </Box>
        <Box sx={jobListStyles.card.cardIdBox}>
          <Typography sx={jobListStyles.card.cardTextLight}>
            #{order.job_order_code}
          </Typography>
        </Box>
      </Box>
      <TabButton status={renderStatus()} handleOpenModal={handleOpenModal} />
      <TabModal
        status={renderStatus()}
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </Card>
  );
};

export default TabCard;
