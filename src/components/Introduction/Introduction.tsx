import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { IntroItem as IntroItemType, IntroProps } from "../../global";
import IntroItem from "./IntroItem";

const Introduction: React.FC<IntroProps> = ({ introduction }) => {
  const theme = useTheme();
  const [areAllIntrosShown, setAreAllIntrosShown] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth > theme.breakpoints.values.lg) {
      setAreAllIntrosShown(true);
    }
  }, [window, theme]);

  return (
    <Box
      sx={{
        padding: { xs: "62px 20px" },
        backgroundColor: "#d8e5ff",
        textAlign: { xs: "center" },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 !important",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: { xs: "40px" },
          }}
        >
          Introduction to Currante
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            gap: "50px",
            mb: "40px",
            justifyContent: "space-evenly",
          }}
        >
          {introduction.map((introItem: IntroItemType, index: number) => {
            if (index < 4 || areAllIntrosShown) {
              return (
                <IntroItem
                  key={index}
                  title={introItem.title}
                  desc={introItem.desc}
                  image={introItem.image}
                />
              );
            }
            return null;
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Introduction;
