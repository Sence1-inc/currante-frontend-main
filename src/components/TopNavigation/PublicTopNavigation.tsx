import { AppBar, Box, Container, Link, Toolbar } from "@mui/material";

const PublicTopNavigation = () => {
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
              alignItems: "center",
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PublicTopNavigation;
