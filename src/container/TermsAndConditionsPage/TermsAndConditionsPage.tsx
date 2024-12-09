import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface TermsAndConditions {
  address: string;
  afterword: string;
  contact_number: string;
  date_updated: string;
  email_address: string;
  disclaimer: string;
  heading: string;
  introduction: string;
  main_items: {
    heading: string;
    content: string;
    specific_to: string;
  }[];
  thank_you_message: string;
}

const TermsAndConditionsPage: React.FC = () => {
  const [data, setData] = useState<TermsAndConditions>({
    address: "",
    afterword: "",
    contact_number: "",
    disclaimer: "",
    date_updated: "",
    email_address: "",
    heading: "",
    introduction: "",
    main_items: Array(11).fill({
      heading: "",
      content: "",
      specific_to: "",
    }),
    thank_you_message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.jsonbin.io/v3/b/${
            import.meta.env.VITE_BIN_ID_TERMS_AND_CONDITIONS
          }/${import.meta.env.VITE_BIN_VERSION}`,
          {
            headers: {
              "X-Master-Key": import.meta.env.VITE_BIN_API_KEY,
              "X-Bin-Meta": false,
            },
          }
        );
        setData(response.data.record);
      } catch (error) {
        if (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box>
        <Typography variant="h2">Terms and Conditions</Typography>
        <Typography variant="h4">Last Updated: {data.date_updated}</Typography>
      </Box>

      <Typography variant="body1">Disclaimer: {data.disclaimer}</Typography>
      <Typography variant="body1">{data.heading}</Typography>
      <Typography variant="body1">{data.introduction}</Typography>

      {data.main_items.map(
        (
          item: { specific_to: string; heading: string; content: string },
          index: number
        ) => {
          if (item.specific_to === "" || item.specific_to === "currante") {
            return (
              <Typography key={index} variant="body1">
                {item.heading}: {item.content}
              </Typography>
            );
          }

          return null;
        }
      )}

      <Typography variant="body1">{data.afterword}</Typography>
      <Box>
        <Typography variant="body1">Company Address: {data.address}</Typography>
        <Typography variant="body1">
          Contact Number: {data.contact_number}
        </Typography>
        <Typography variant="body1">
          Email Address: {data.email_address}
        </Typography>
      </Box>

      <Typography variant="body1">{data.thank_you_message}</Typography>
    </Box>
  );
};

export default TermsAndConditionsPage;
