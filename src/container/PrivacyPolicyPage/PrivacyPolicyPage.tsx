import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface PrivacyPolicy {
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
    sub_contents: {
      heading: string;
      content: string;
    }[];
    specific_to: string;
  }[];
  thank_you_message: string;
}

const PrivacyPolicyPage: React.FC = () => {
  const [data, setData] = useState<PrivacyPolicy>({
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
      sub_contents: [],
      specific_to: "",
    }),
    thank_you_message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.jsonbin.io/v3/b/${
            import.meta.env.VITE_BIN_ID_PRIVACY_POLICY
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
      <Typography variant="h2">Privacy Consent</Typography>
      <Typography variant="body1">{data.heading}</Typography>
      <Typography variant="body1">{data.introduction}</Typography>

      {data.main_items.map(
        (
          item: {
            heading: string;
            content: string;
            sub_contents: {
              heading: string;
              content: string;
            }[];
            specific_to: string;
          },
          index: number
        ) => {
          if (item.specific_to === "" || item.specific_to === "currante") {
            return (
              <>
                <Typography key={`h3-${index}`} variant="h3">
                  {item.heading}
                </Typography>
                <Typography key={`p-${index}`} variant="body1">
                  {item.content}
                </Typography>
                {item.sub_contents.length > 0
                  ? item.sub_contents.map(
                      (
                        sub_content: { heading: string; content: string },
                        ind: number
                      ) => {
                        return (
                          <Box sx={{ margin: 0 }}>
                            <Typography key={`h4-${ind}`} variant="body1">
                              {sub_content.heading}
                            </Typography>
                            <Typography key={`p-${ind}`} variant="body1">
                              {sub_content.content}
                            </Typography>
                          </Box>
                        );
                      }
                    )
                  : null}
              </>
            );
          }

          return null;
        }
      )}

      <Typography variant="h3">Contact Information</Typography>
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
    // <div className="content_privacy-body">
    //   <h2 className="content_privacy-body-header">Privacy Consent</h2>
    //   <p className="content_privacy-body-text">{data.heading}</p>
    //   <p className="content_privacy-body-text">{data.introduction}</p>

    //   {data.main_items.map(
    //     (
    //       item: {
    //         heading: string;
    //         content: string;
    //         sub_contents: {
    //           heading: string;
    //           content: string;
    //         }[];
    //         specific_to: string;
    //       },
    //       index: number
    //     ) => {
    //       if (item.specific_to === "" || item.specific_to === "scholaris") {
    //         return (
    //           <>
    //             <h3
    //               key={`h3-${index}`}
    //               className="content_privacy-body-subheader"
    //             >
    //               {item.heading}
    //             </h3>
    //             <p key={`p-${index}`} className="content_privacy-body-text">
    //               {item.content}
    //             </p>
    //             {item.sub_contents.length > 0
    //               ? item.sub_contents.map(
    //                   (
    //                     sub_content: { heading: string; content: string },
    //                     ind: number
    //                   ) => {
    //                     return (
    //                       <>
    //                         <h4
    //                           key={`h4-${ind}`}
    //                           className="content_privacy-third-level-heading"
    //                         >
    //                           {sub_content.heading}
    //                         </h4>
    //                         <p
    //                           key={`p-${ind}`}
    //                           className="content_privacy-body-text"
    //                         >
    //                           {sub_content.content}
    //                         </p>
    //                       </>
    //                     );
    //                   }
    //                 )
    //               : null}
    //           </>
    //         );
    //       }

    //       return null;
    //     }
    //   )}

    //   <h3 className="content_privacy-body-subheader">Contact Information</h3>
    //   <p className="content_privacy-body-text">{data.afterword}</p>
    //   <div className="content_container-contact">
    //     <p className="content_contact-info">Company Address: {data.address}</p>
    //     <p className="content_contact-info">
    //       Contact Number: {data.contact_number}
    //     </p>
    //     <p className="content_contact-info">
    //       Email Address: {data.email_address}
    //     </p>
    //   </div>
    //   <p className="content_privacy-body-text"> {data.thank_you_message}</p>
    // </div>
  );
};

export default PrivacyPolicyPage;
