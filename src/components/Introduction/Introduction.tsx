import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Box, Collapse, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import IntroItem from "./IntroItem";

const Introduction: React.FC<IntroProps> = ({ introduction }) => {
  const theme = useTheme();
  const [areAllIntrosShown, setAreAllIntrosShown] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth > theme.breakpoints.values.lg) {
      setAreAllIntrosShown(true);
    }
  }, [window, theme]);

  const toggleCollapse = () => {
    setAreAllIntrosShown(!areAllIntrosShown);
  };
  return (
    <Box
      sx={{
        padding: { xs: "62px 0", lg: "62px 97px" },
        backgroundColor: "#d8e5ff",
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
          variant="h3"
          sx={{
            marginBottom: "75px",
            alignSelf: { md: "start" },
          }}
        >
          Introduction to Currante
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            marginBottom: "75px",
          }}
        >
          {introduction.map((introItem: IntroItem, index: number) => {
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

          <Collapse
            sx={{ width: "100%" }}
            in={areAllIntrosShown}
            timeout="auto"
            unmountOnExit
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "40px",
              }}
            >
              {introduction
                .slice(introduction.length)
                .map((introItem: IntroItem, index: number) => (
                  <IntroItem
                    key={index + 4}
                    title={introItem.title}
                    desc={introItem.desc}
                    image={introItem.image}
                  />
                ))}
            </Box>
          </Collapse>
        </Box>
        {introduction.length > 4 &&
          window.innerWidth <= theme.breakpoints.values.lg && (
            <Box
              onClick={toggleCollapse}
              sx={{
                cursor: "pointer",
                width: "160px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: "18px",
              }}
            >
              {areAllIntrosShown ? (
                <KeyboardDoubleArrowUpIcon
                  sx={{
                    color: "#D2580B",
                    height: "40px",
                    width: "40px",
                  }}
                />
              ) : (
                <KeyboardDoubleArrowDownIcon
                  sx={{
                    color: "#D2580B",
                    height: "40px",
                    width: "40px",
                  }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  align: "center",
                  fontFamily: "Open Sans",
                  fontWeight: "300",
                  fontSize: "14px",
                  color: "#000000",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {areAllIntrosShown
                  ? "Show Less"
                  : "Know more about our app's services"}
              </Typography>
            </Box>
          )}
      </Container>
    </Box>
  );
};

export default Introduction;
