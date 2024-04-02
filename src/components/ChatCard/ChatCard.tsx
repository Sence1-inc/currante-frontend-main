import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

const ChatCard = () => {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "12px",
        padding: "16px",
        height: "80px",
        border: "1px #C5C6D0 solid",
        boxShadow: "none",
      }}
    >
      <Avatar
        sx={{ width: "40px", height: "40px", alignSelf: "center" }}
        src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h6">Header</Typography>
          <Typography variant="subtitle1">#123456</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="body2">Jane Smith</Typography>
          <Typography variant="body2">&#x2022;</Typography>
          <Typography variant="body2">Pasig City</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
