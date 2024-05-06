import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../../axiosInstance";
import { initializeUser } from "../../redux/reducers/UserReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { User } from "../../redux/type";

const settings = ["Manage Profile", "Logout"];

const initialState: User = {
  logged_in_as: "",
  id: null,
  overall_rating: 0,
  email: "",
  role: {
    role_name: "",
    role_details: "",
  },
  orders: [
    {
      id: null,
      created_at: "",
      job_order_start_date: "",
      worker_arrived_date: "",
      job_order_completed_date: "",
      worker_id: null,
      employer_id: null,
      worker_name: "",
      employer_name: "",
      worker_job_subtype: {
        worker_id: null,
        job_subtype: {
          job_type_id: null,
          job_subtype_id: 0,
          worker_job_subtype_id: 0,
          job_type: "",
          job_name: "",
          unit: "",
          job_unit_price: 0,
          active_flg: false,
        },
        job_unit_price: null,
      },
      quantity: null,
      total: null,
      status: "",
      job_order_code: "",
    },
  ],
  description: "",
  schedule: "",
  uuid: "",
  job_subtypes: [
    {
      job_type_id: null,
      job_subtype_id: 0,
      worker_job_subtype_id: 0,
      job_type: "",
      job_name: "",
      unit: "",
      job_unit_price: 0,
      active_flg: false,
    },
  ],
  areas: [],
  first_name: "",
  middle_name: "",
  last_name: "",
  suffix: "",
  birthday: "",
  gender: "",
  phone_number: "",
  addresses: [
    {
      province: "",
      city: "",
      barangay: "",
      street: "",
      house_building_unit: "",
    },
  ],
  user_photos: [{ profile_photo: "", id_photo: "" }],
  reviews: [
    {
      id: null,
      overall_rating: null,
      review_for: "",
      feedback: "",
      order: {
        id: null,
        created_at: "",
        job_order_start_date: "",
        worker_arrived_date: "",
        job_order_completed_date: "",
        worker_id: null,
        employer_id: null,
        worker_name: "",
        employer_name: "",
        worker_job_subtype: {
          worker_id: null,
          job_subtype: {
            job_type_id: null,
            worker_job_subtype_id: 0,
            job_subtype_id: 0,
            job_type: "",
            job_name: "",
            unit: "",
            job_unit_price: 0,
            active_flg: false,
          },
          job_unit_price: null,
        },
        quantity: null,
        total: null,
        status: "",
        job_order_code: "",
      },
      category_rating: [
        {
          category: {
            name: "",
          },
          rating: null,
        },
      ],
    },
  ],
};

function ResponsiveAppBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
  //   null
  // );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/logout", {
        email: user.email,
      });

      if (response.status === 200) {
        dispatch(initializeUser(initialState));
        navigate("/sign-in");
      }
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return (
    <AppBar
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#A1B5DE",
        padding: "12px",
        boxSizing: "border-box",
        height: "64px",
      }}
    >
      <Container maxWidth="xl" sx={{}}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "flex-start",
              minHeight: "unset",
            }}
          >
            <Link href="/" underline="none" sx={{ minHeight: "unset" }}>
              <Box
                component="img"
                src="/src/assets/logo.png"
                sx={{
                  width: "151px",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  transform: "translate(10px, 0)",
                  minHeight: "unset",
                }}
              />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                }}
              >
                <AccountCircleIcon
                  sx={{
                    fill: "#FFFFFF",
                    width: {
                      sm: "24px",
                      md: "40px",
                    },
                    height: {
                      sm: "24px",
                      md: "40px",
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                ".css-134qb6a-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
                  right: "0 !important",
                  width: "150px",
                  left: "unset !important",
                  backgroundColor: "#A1B5DE",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Manage Profile") {
                      navigate("/profile");
                    } else {
                      handleLogout();
                    }
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      color: "#0E2F71",
                    }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
