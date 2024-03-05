import { Link } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Logo from '../../assets/logo.png';

const Header: React.FC = () => {
  return (
    <Box sx={{ py: 1, backgroundColor: 'primary.light' }}>
      <Container>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </Container>
    </Box>
  )
}

export default Header;