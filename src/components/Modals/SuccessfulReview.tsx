import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckImage from '../../assets/check.svg';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "400px",
  maxWidth: "70vw",
  bgcolor: '#E8E7EF',
  boxShadow: 24,
  padding: "35px 24px",
  borderRadius: "28px",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
};

export default function SuccessfulReview(props) {
  let navigate = useNavigate()
  const handleClick = () => {
      navigate('/jobs')
   }

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box sx={{
                margin: "0 auto"
            }}>
                <img src={CheckImage} alt="" />
            </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                margin: "10px auto 0"
            }}>
          Thank you for your review
          </Typography>
          <Typography sx={{fontSize: "1.25rem", padding: "10px 0px 10px", marginTop: "10px"}}>
          Your payment will be released after 1-3 business days or once the employer agreed that the job is done.
You may request to your employer to review your services.
Thank you!
          </Typography>
            <Box sx={{
                textAlign: "right",
                marginTop: "20px"
            }}>
                <Button variant="contained" sx={{
                padding:"10px 20px",
                borderRadius: "5px",
                "&:hover": {
                    backgroundColor: "secondary.main",
                },
                }} onClick={handleClick}>Confirm</Button>
            </Box>
          </Box>
      </Modal>
    </div>
  );
}