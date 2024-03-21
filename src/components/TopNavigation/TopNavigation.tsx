import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';  
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const settings = ['Manage Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ width: "100%", 
    position: "fixed", 
    top: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: "#A1B5DE", 
    padding: "12px",
    boxSizing: "border-box",
    height: "64px"}}>
      <Container maxWidth="xl" sx={{
      }}>
        <Toolbar disableGutters sx={{
          display: "flex",
          alignItems: "flex-start"
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "flex-start",
            minHeight: "unset"
          }}>
            <Link href="/" underline="none" sx={{minHeight: "unset"}}>
              <Box component="img" src="/src/assets/logo.png" sx={{
                width: "151px", 
                height: "100%",
                display: "flex", 
                alignItems: "flex-start",
                transform: "translate(10px, 0)",
                minHeight: "unset"
              }}/>
            </Link>        
          </Box>    

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,
                display: "flex",
                alignItems: "center",
                height: "40px"
                }}>
                <AccountCircleIcon sx={{
                  fill: "#FFFFFF",
                  width: {
                    sm: "24px",
                    md: "40px"
                  },
                  height:  {
                    sm: "24px",
                    md: "40px"
                  }
                }}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px",
                ".css-134qb6a-MuiPaper-root-MuiPopover-paper-MuiMenu-paper" : {
                  right: "0 !important",
                  width: "150px",
                  left: "unset !important",
                  backgroundColor: "#A1B5DE"
                }
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" sx={{
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    color: "#0E2F71"
                  }}>{setting}</Typography>
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
