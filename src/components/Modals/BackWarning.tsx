import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WarningImage from '../../assets/warning.svg';

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

export default function BackWarning(props) {

  let navigate = useNavigate()
  const handleClick = () => {
      navigate('/jobs')
   }
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

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
                <img src={WarningImage} alt="" />
            </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                margin: "10px auto 0"
            }}>
          Warning!
          </Typography>
          <Typography sx={{fontSize: "1.25rem", padding: "10px 0px 10px", marginTop: "10px"}}>
            By going back, your payment will not be processed.
You may come back again to finish your review. 
Thank you!
          </Typography>
            <Box sx={{
                textAlign: "right",
                marginTop: "20px"
            }}>
                <Button sx={{ padding:"10px 20px", marginRight: "10px" }} onClick={handleClick}>Later</Button>
                <Button variant="contained" sx={{
                padding:"10px 20px",
                borderRadius: "5px",
                "&:hover": {
                    backgroundColor: "secondary.main",
                },
                }} onClick={props.close}>Review now</Button>
            </Box>
          </Box>
      </Modal>
    </div>
  );
}