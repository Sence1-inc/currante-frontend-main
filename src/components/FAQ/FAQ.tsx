import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Container, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { TEASER_GENERAL_FAQ } from "../../data/FaqContent";
import "./FAQ.css";

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      console.log(event);
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box className="faq__wrapper">
      <Container>
        <Typography variant="h2">Currante's FAQ</Typography>
        {TEASER_GENERAL_FAQ.map((item) => (
          <Accordion
            sx={{
              background: "#D8E5FF",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleChange(item.id)}
          >
            <AccordionSummary
              sx={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#0E2F71",
              }}
              expandIcon={
                expanded === item.id ? (
                  <RemoveIcon sx={{ color: "#EDA175" }} />
                ) : (
                  <AddIcon sx={{ color: "#EDA175" }} />
                )
              }
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
            >
              <Typography>{item.title}</Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                fontFamily: "Open Sans",
                fontSize: "20px",
                fontWeight: "400",
                color: "#000",
                background: "#fff",
                padding: "25px 15px",
              }}
            >
              <Typography>{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default FAQ;
