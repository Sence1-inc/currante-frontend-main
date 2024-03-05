import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import BannerImage from '../../assets/banner.png';

const Keyvisual: React.FC = () => {
  return (
    <Box sx={{ py: 1, backgroundColor: 'primary.light' }}>
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6">Your Ultimate Home Maintenance Solution</Typography>
          <Typography variant="h2">Hire at Currante</Typography>
          <Button>GET STARTED</Button>
        </Box>
        <Box>
          <img src={BannerImage} alt="" />
        </Box>
      </Container>
    </Box>
  )
}

export default Keyvisual;