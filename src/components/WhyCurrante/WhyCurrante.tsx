import { Box, Container, Typography } from "@mui/material";
import WhyCurranteItem from "./WhyCurranteItem";

const WhyCurrante: React.FC<WhyCurranteProps> = ({ whyCurrante }) => {
  return (
    <Box
      sx={{
        padding: { xs: "62px 0", lg: "62px 97px" },
        width: "100%",
        backgroundColor: "#FFFFFF",
        textAlign: { xs: "center", lg: "left" },
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: "48px",
            color: "#0e2f71",
            marginBottom: {
              xs: "40px",
              lg: "75px",
            },
            alignSelf: { md: "start" },
          }}
        >
          Why Choose
          <Box
            component="span"
            sx={{
              display: {
                xs: "block",
                sm: "inline",
              },
            }}
          >
            {" "}
            Currante?
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            padding: {
              xs: "0",
              sm: "0 113px",
              lg: "0 140px",
            },
            rowGap: {
              xs: "20px",
              lg: "40px",
            },
            columnGap: "40px",
            marginBottom: "75px",
          }}
        >
          {whyCurrante.map(
            (whyCurranteItem: WhyCurranteItem, index: number) => {
              return (
                <WhyCurranteItem
                  key={index}
                  title={whyCurranteItem.title}
                  desc={whyCurranteItem.desc}
                  image={whyCurranteItem.image}
                />
              );
            }
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default WhyCurrante;
