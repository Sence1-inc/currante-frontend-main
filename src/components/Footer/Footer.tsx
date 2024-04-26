import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          py: 2,
          px: { md: 0, xs: 3 },
          backgroundColor: "background.paper",
        }}
      >
        <Container sx={{ p: 0 }}>
          <Typography variant="body1" sx={{ color: "primary.main" }}>
            <strong>DISCLAIMER:</strong> Currante solely serves as a third-party
            IT intermediary connecting potential employers with potential
            workers and does not engage in hiring or managing any personnel.
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{ py: 2, px: { md: 0, xs: 3 }, backgroundColor: "primary.main" }}
      >
        <Container
          sx={{
            p: 0,
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: { md: "auto", xs: 4 },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              alignItems: { md: "flex-start", xs: "center" },
              gap: 3,
              minWidth: 0,
            }}
          >
            <ListItem sx={{ width: "auto", p: 0 }}>
              <Link
                width="auto"
                variant="body1"
                color="common.white"
                component={RouterLink}
                to="/newsletter"
              >
                Newsletter
              </Link>
            </ListItem>
            <ListItem sx={{ width: "auto", p: 0 }}>
              <Link
                width="auto"
                variant="body1"
                color="common.white"
                component={RouterLink}
                to="/terms-and-conditions"
              >
                Terms and Conditions
              </Link>
            </ListItem>
            <ListItem sx={{ width: "auto", p: 0 }}>
              <Link
                width="auto"
                variant="body1"
                color="common.white"
                component={RouterLink}
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </ListItem>
          </List>
          <Typography variant="subtitle1" color="common.white">
            Copyright © Currante 2024 | All Rights Reserved
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
