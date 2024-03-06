// import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

interface PrimaryButtonProps {
  text: string;
  url?: string;
  fullWidth?: boolean
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, url, fullWidth }) => {
  return (
    <>
      <Button 
        sx={
          { py: 2, 
            px: 6,
            borderRadius: 4,
            backgroundColor: 'secondary.main', 
            color: 'common.white',
            variant: 'h6',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'secondary.dark',
            },
          }
        }
        fullWidth={fullWidth}
        href={url}
      >
        { text }
      </Button>
    </>

  )
}

export default PrimaryButton;