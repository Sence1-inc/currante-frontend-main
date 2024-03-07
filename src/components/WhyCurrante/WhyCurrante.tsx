
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WhyCurranteItem from "./WhyCurranteItem";

const WhyCurrante: React.FC<WhyCurranteProps> = ({ whyCurrante }) => {
const theme = useTheme();

  return (
    <Box
      sx={{
        padding: { xs: "62px 0", md: "62px 97px" },
        width: "100%",
        backgroundColor: "#FFFFFF",
        textAlign: { xs: "center", md: "left" },
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
              lg: "75px"
            },
            alignSelf: { md: "start" },
          }}
        >
          Why Choose 
          <Box component="span" sx={{
            display: {
              xs: "block",
              sm: "inline"
            }
          }}> Currante?
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            padding: {
              xs: "0 113px",
              lg: "0 140px"
            },
            rowGap: {
              xs: "20px",
              lg: "40px"
            },
            columnGap: "40px",
            marginBottom: "75px"
          }}
        >
         {whyCurrante.map((whyCurranteItem: WhyCurranteItem, index: number) => {
              return (
                <WhyCurranteItem
                  key={index}
                  title={whyCurranteItem.title}
                  desc={whyCurranteItem.desc}
                  image={whyCurranteItem.image}
                />
              );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default WhyCurrante;