import React, { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import ProfileImage from '../../assets/profile.png'
import TabModal from "./TabModal";
import TabButton from "./TabButton";
import jobListStyles from "../../styles/jobListStyles";

interface TabCardProps {
  item: {
    id: string
    provider_name?: string
    status: string
  }
}

const TabCard: React.FC<TabCardProps> = ({ item }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const capitalizeFirstLetter = (str: string)  =>{
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <Card sx={ jobListStyles.container.cardContainer }>
      <Box>
        <Typography sx={ jobListStyles.card.cardStatusText }>{ capitalizeFirstLetter(item.status) }</Typography>
      </Box>
      <Box sx={ jobListStyles.card.cardContentBox }>
        <Box sx={ jobListStyles.card.cardImageBox }>
          <Box sx={{  marginBottom: '5px' }}><img src={ProfileImage} alt="" /></Box>
          <Typography sx={ jobListStyles.card.cardText }>{ item.provider_name }</Typography>
        </Box>
        <Box sx={ jobListStyles.card.cardDetailsBox }>
          <Typography sx={ jobListStyles.card.cardHeading }>Header</Typography>
          <Typography sx={ jobListStyles.card.cardSubHeading }>Quezon City</Typography>
           <Box>
            <Typography sx={ jobListStyles.card.cardText }>Requested on: 03 Jan 2024 10:00</Typography> 
           </Box>
        </Box>
        <Box sx={ jobListStyles.card.cardIdBox }>
          <Typography sx={ jobListStyles.card.cardTextLight }>#{ item.id }</Typography>
        </Box>
      </Box>
      <TabButton status={ item.status} handleOpenModal={handleOpenModal} /> 
      <TabModal 
        status={item.status} 
        openModal={openModal} 
        handleOpenModal={handleOpenModal} 
        handleCloseModal={handleCloseModal}  
      />
    </Card>
  )
}

export default TabCard;