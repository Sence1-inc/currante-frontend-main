import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Box, Container, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import { TextField, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ProfilePage: React.FC = () => {
  return (
    <Box>
      <Header />
      <Container
        component={"section"}
        sx={{
          textAlign: "center",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          padding={"10px 0"}
        >
          <ArrowBackOutlinedIcon />
          <Button
            variant="contained"
            sx={{
              background: "#F58A47",
              fontFamily: "Open Sans",
              fontWeight: "400px",
              fontSize: "12px",
            }}
          >
            Edit
          </Button>
        </Box>
        <Box
          padding={"20px 0"}
          sx={{
            background: "#A1B5DE",
          }}
        >
          <CameraAltIcon
            sx={{
              color: "#fff",
            }}
          />
        </Box>
      </Container>
      <Container component={"section"}>
        <Box p={"20px 0"} textAlign={"center"}>
          <PersonIcon
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "90px",
              width: "90px",
              height: "90px",
              padding: "10px",
              color: "#A1B5DE",
            }}
          />

          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: "22px",
              color: "#F58A47",
            }}
          >
            Jane Smith
          </Typography>

          <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
            <StarIcon
              sx={{
                color: "#F58A47",
                width: "10px",
              }}
            />

            <StarIcon
              sx={{
                color: "#A1B5DE",
                width: "10px",
              }}
            />

            <Typography>(4 stars)</Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: "Open Sans",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "1.6",
              margin: "10px 0 20px",
            }}
          >
            Job description here. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed eget consequat nibh, vitae posuere leo.
          </Typography>

          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Basic Info
            </Typography>

            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                margin: "0 0 15px",
              }}
            >
              Some info may be visible to other people
            </Typography>

            <Box>
              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Name</InputAdornment>
                  ),
                }}
                variant="standard"
                value={"Jane Smith"}
              />

              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Birthday</InputAdornment>
                  ),
                }}
                variant="standard"
                value={"01/16/1998"}
              />

              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Gender</InputAdornment>
                  ),
                }}
                variant="standard"
                value={"Female"}
              />
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Contact Info
            </Typography>

            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                margin: "0 0 15px",
              }}
            >
              Some info may be visible to other people
            </Typography>

            <Box>
              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Email</InputAdornment>
                  ),
                }}
                variant="standard"
                value={"jane.smith@email.com"}
              />

              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Phone</InputAdornment>
                  ),
                }}
                variant="standard"
                value={"09123456789"}
              />
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Rates
            </Typography>

            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                margin: "0 0 15px",
              }}
            >
              Some info may be visible to other people
            </Typography>

            <Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "11px",
                }}
              >
                General Cleaning
              </Typography>

              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      House cleaning
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                value={"₱25/sqm"}
              />
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Business Hours
            </Typography>

            <Typography
              sx={{
                fontFamily: "Open Sans",
                fontWeight: "400",
                fontSize: "12px",
                margin: "0 0 15px",
              }}
            >
              Some info may be visible to other people
            </Typography>

            <Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "11px",
                }}
              >
                Business Hours
              </Typography>

              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Regular Days
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                value={"Weekdays 5:00-24:00"}
              />

              <TextField
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Holidays</InputAdornment>
                  ),
                }}
                variant="standard"
                value={"Year-end December 31st"}
              />
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #F58A47",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "left",
              margin: "0 0 20px",
            }}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "1.7",
                }}
              >
                Servicing Area
              </Typography>
              <ControlPointOutlinedIcon
                sx={{
                  color: "#F58A47",
                }}
              />
            </Box>

            <Box>
              <TextField
                sx={{
                  width: "100%",
                  padding: "0 15px",
                }}
                id="standard-basic"
                variant="standard"
                value={"Quezon City"}
              />
              <TextField
                sx={{
                  width: "100%",
                  padding: "0 15px",
                }}
                id="standard-basic"
                variant="standard"
                value={"Pasig City"}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfilePage;
