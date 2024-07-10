import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { SERVICES } from "../../data/ExploreOurServicesContent";
import { ServiceItem } from "../../global";

const ExploreOurServices = () => {
  return (
    <Box
      sx={{
        bgcolor: "rgba(255, 225, 206, 1)",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: "40px",
        alignItems: {xs: "center", lg: "flex-start"},
        justifyContent: "center",
        padding: "80px 20px",
        flexWrap: "wrap",
      }}
    >
      <Card
        sx={{
          order: { xs: 1, lg: 2 },
          backgroundColor: "transparent",
          boxShadow: "none",
          border: "none",
          borderRadius: 0,
          width: {lg: "calc((510/1200) * 100%)"},
          display: "flex",
          flexDirection: "column",
          rowGap: "18px",
          alignItems: {xs: "center", lg: "flex-start"}
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            rowGap: "18px",
            alignItems: {xs: "center", lg: "flex-start"},
            padding: "0",
            margin: { lg: "auto 0 0 0" },
            textAlign: { xs: "center", lg: "left" }
          }}
        >
          <Typography
            variant="h2"
          >
            Explore our Services
          </Typography>
          <Typography
            variant="body2"
            color="primary.main"
            sx={{ 
              textAlign: { xs: "center", md: "center", lg: "left" },
              fontWeight: "400",
              fontSize: "16.5px" }}
          >
            Explore our services today and experience the joy of a sparkling,
            well-maintained space. 
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Button
            sx={{
              margin: { xs: "auto", lg: "0" },
              color: "common.white",
              bgcolor: "secondary.main",
              borderRadius: "16px",
              padding: "15px 40px 15px 40px",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            Explore Our Services
          </Button>
        </CardActions>
      </Card>

      {SERVICES.map((service: ServiceItem, index: number) => {
        return (
          <Card
            key={index}
            sx={{
              order: { xs: index + 1, lg: service.order },
              height: { xs: "250px", md: "300px" },
              width: { xs: "100%", lg: "calc((510/1200) * 100%)" },
            }}
          >
            <CardMedia
              sx={{
                height: "100%",
                width: "100%",
              }}
              image={service.image} // Placeholder image URL
              title={service.service + " " + index}
            >
              <Typography
                sx={{
                  padding: "24px 25px 24px 25px",
                  color: "rgba(255, 255, 255, 1)",
                  backgroundColor: "rgba(80, 80, 80, 0.5)",
                }}
                variant="body1"
              >
                {service.description}
              </Typography>
            </CardMedia>
          </Card>
        );
      })}
      </Box>
    
  );
};

export default ExploreOurServices;
