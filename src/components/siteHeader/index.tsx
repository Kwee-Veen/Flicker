import React, { useState, MouseEvent, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuOptions } from "../../types/interfaces";
import { AuthContext } from "../../contexts/authContext";

const styles = {
    title: {
      fontWeight: '500',
      letterSpacing: 6,
      fontFamily: 'Monospace',
      textDecoration: "none",
      pl: 2,
      pr: 6,
    },
    auth: {
      display: 'inline',
      fontWeight: 'Light',
      alignItems: 'flex-start',
      fontFamily: 'Monospace',
      textDecoration: "none",
    },
    buttons: {
      bgcolor: 'primary',
      fontFamily: 'Monospace',
      boxShadow: "10"
    },
    filler: {
      display: 'inline',
      flexGrow: 5,
      boxShadow: "none"
    },
    filler_small: {
      display: 'inline',
      flexGrow: 1,
      boxShadow: "none"
    },
  };

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const { token, signout } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const movieOptions: MenuOptions[] = [
    { label: "Discover", path: "/" },
    { label: "Trending", path: "/movies/popular" },
    { label: "Favourites List", path: "/movies/favourites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Must-Watch List", path: "/movies/mustWatch" },
  ];

  const tvOptions: MenuOptions[] = [
    { label: "Discover", path: "/tv" },
    { label: "Trending", path: "/tv/trending" },
    { label: "Favourites List", path: "/tv/favourites" },
  ];

  const [menuOptions, setMenuOptions] = useState<MenuOptions[]>(movieOptions);
  const [movieOrTV, setMovieOrTV] = useState<Boolean>(false);   
  const [toggleButtonText, setToggleButtonText] = useState<string>("Movies");  
  const [flickerLinkPath, setFlickerLinkPath] = useState<string>("/");  

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const toggleMoviesOrTV = () => {
    setMovieOrTV(!movieOrTV);
    if (movieOrTV) {
      setMenuOptions(movieOptions);
      setFlickerLinkPath("/");
      setToggleButtonText("Movies");
    }
    else {
      setMenuOptions(tvOptions);
      setFlickerLinkPath("/tv");
      setToggleButtonText(" TV ");
    }
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="error">
        <Toolbar>
        <img rel="icon" src="/flicker-interference-icon-white.svg" width="38" height="auto"></img>
          <Typography variant="h4" sx={styles.title} component={Link} to={flickerLinkPath} color="white"> 
            Flicker
          </Typography>

          <Button
            color="secondary"
            onClick={() => toggleMoviesOrTV()}
            variant="contained"
            style={{minWidth: '90px'}}
          >
            {toggleButtonText}
          </Button>

          &nbsp;&nbsp;&nbsp;

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path as string)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <>
                &nbsp;
                <Button variant="outlined"
                
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path as string)}
                >
                  &nbsp;
                  {opt.label}
                  &nbsp;
                </Button>
                &nbsp;&nbsp;
                </>
              ))}
              <Typography sx={styles.filler_small} ></Typography>
            </>
          )}


          {token ? (
            <Typography variant="body2" sx={styles.auth}>
              Hey {token.given_name} 👋&nbsp;
              <Button sx={styles.buttons} variant="contained" color='warning' onClick={() => signout && signout()}>Sign out</Button>
            </Typography>
          ) : (
            <Typography variant="body2" sx={styles.auth} >
              &nbsp;Log in 👉&nbsp;
              <Button sx={styles.buttons} variant="contained" color='warning' onClick={() => navigate("login") }>Login</Button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;