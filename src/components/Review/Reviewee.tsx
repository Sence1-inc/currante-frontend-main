import { Box, Container, Typography } from '@mui/material';
import placeholderImg from '../../../public/images/img_person.svg';
import starFilled from '../../../public/images/icon_star_filled.svg';
import starInactive from '../../../public/images/icon_star_inactive.svg';

export default function Reviewee() {
  return (
    <Box sx={{
        boxSizing: "border-box",
        paddingBottom: "20px",
        borderBottom: "9px solid #D9D9D9"
    }}>
        <Container>
            <Box sx={{
                display: "flex",
                padding: "15px 0px"
            }}>
                <img src={placeholderImg} alt="" sx={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    backgroundColor: "pink"
                }}/>
                <Container sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: 'left',
                }}>
                    <Typography variant="titleMed">Jane Smith</Typography>
                    <Typography variant="bodySmall" sx={{marginTop: "5px"}}>Laborum quasi distinctio est et. Sequi omnis molestiae. Officia occaecati voluptatem accusantium. Et corrupti saepe quam.</Typography>
                </Container>
            </Box>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Typography variant='labelSmall'>Overall Rating</Typography>
                <Box sx={{display: "flex"}}>
                    <img src={starFilled} alt="" />
                    <img src={starFilled} alt="" />
                    <img src={starFilled} alt="" />
                    <img src={starFilled} alt="" />
                    <img src={starInactive} alt="" />
                    <Typography variant='labelSmall' sx={{marginLeft:"5px"}}>(4 Stars)</Typography>
                </Box>
            </Box>
        </Container>
    </Box>
  );
}

