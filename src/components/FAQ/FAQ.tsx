import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Container, Typography } from '@mui/material';
import './FAQ.css'

const FAQ: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);
  
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    // Array of data for Accordion items
    const accordionGeneral = [
      { id: 'panel1', title: 'What services does your company offer?', 
        content: 'We offer a comprehensive range of cleaning, carpentry, and plumbing services, including home cleaning, office maintenance, specialized cleaning for unique needs, and scheduled maintenance plans. Explore our services page for more details.' },
      { id: 'panel2', title: 'How can I book your services?', 
        content: "Booking with Currante is easy! Sign up and edit your profile. Head to the homepage and select the job category you're interested in. Browse our available workers and engage in a chat with your chosen skilled worker. Once you've discussed the specifics, proceed to make your payment. Wait for the worker confirmation, and the booking will be scheduled. Need help? Reach out to our customer service team. "},
      { id: 'panel3', title: "How can I verify the authenticity of the person I'm conversing with?", 
        content: "Your safety and the security of your spaces are our top priorities. All users are verified through their Philsys ID. Currante does not proceed with the user’s sign up if the ID they provided is not a valid Philsys ID." },
      { id: 'panel4', title: "Is my personal information secure on Currante?", 
        content: "Yes, your privacy and security are our top priorities. Currante employs industry-standard security measures to protect your personal information. Our Privacy Policy provides detailed information on how we handle and safeguard your data." },
      { id: 'panel5', title: "How can I browse and book services on your platform?", 
        content: "After logging in, you can browse available services by category or use the search feature. Once you find a service provider that fits your needs, click on the service, customize details if needed, and proceed to book." },
      { id: 'panel6', title: "Is there a review system for service providers?", 
        content: "Yes, after receiving a service, you can leave a review and rating for the service provider. This helps build a trustworthy community and assists other employers in making informed decisions." },
      { id: 'panel7', title: "How are payments processed for services booked through your platform?", 
        content: 'Payments are securely processed through our platform. We use a third-party platform to process your payment. For now, we will only accept e-payments.' },
      { id: 'panel8', title: "Is there a booking fee?", 
        content: "Yes, a booking fee will be collected from potential employers. Please see our Terms and Conditions for the booking fee."},
      { id: 'panel9', title: 'As a worker, how will I earn from the platform?', 
        content: 'After signing up, you may proceed with updating your profile including your rates. Rest assured that Currante will not deduct any fee from the rate you indicated.' },
      { id: 'panel10', title: "Can I communicate with employers before accepting a job?", 
        content: "Yes, our platform provides a messaging system that allows you to communicate directly with employers. Feel free to discuss job details, expectations, and any specific requirements before accepting an offer." },
    ];
  
    return (
        <Box className='faq__wrapper'>
          <Container>
              <h2>Currante's FAQ</h2>
              {accordionGeneral.map((item) => (
              <Accordion sx={{ background: '#D8E5FF',
                  borderRadius: '8px',
                  marginBottom: '20px'
                  }}

                  key={item.id}
                  expanded={expanded === item.id}
                  onChange={handleChange(item.id)}
              >

                  <AccordionSummary                    
                    sx={{ fontFamily: 'Poppins',
                      fontSize: '24px', fontWeight: 'bold',
                      color: '#0E2F71'

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
                    sx={{ fontFamily: 'Open Sans', fontSize: '20px',
                      fontWeight: '400',
                      color: '#000', background: '#fff',
                      padding: '25px 15px'
                    }}
                  >

                  <Typography>
                      {item.content}
                  </Typography>

                  </AccordionDetails>

              </Accordion>

              ))}
          </Container>
      </Box>
    );

  };
  
  export default FAQ;