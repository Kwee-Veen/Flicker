import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuOptions } from "../../types/interfaces";

const styles = {
    title: {
      flexGrow: 1,
      fontWeight: '500',
      letterSpacing: 6,
      fontFamily: 'Monospace'
    },
    // subtitle: {
    //   flexGrow: 8,
    //   fontWeight: 'light',
    //   textAlign: 'left',
    // },
  };

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const movieOptions: MenuOptions[] = [
    { label: "Discover Movies", path: "/" },
    { label: "Trending Movies", path: "/movies/popular" },
    { label: "Favorite Movies", path: "/movies/favourites" },
    { label: "", path: "" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Must-Watch Movies", path: "/movies/mustWatch" },
  ];

  const tvOptions: MenuOptions[] = [
    { label: "Discover TV", path: "/tv" },
    { label: "Trending TV", path: "/tv/trending" },
    { label: "TV Favourites", path: "/tv/favourites" },
  ];

  const [menuOptions, setMenuOptions] = useState<MenuOptions[]>(movieOptions);
  const [movieOrTV, setMovieOrTV] = useState<Boolean>(false);  

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const toggleMoviesOrTV = () => {
    setMovieOrTV(!movieOrTV);
    if (movieOrTV) setMenuOptions(movieOptions);
    else setMenuOptions(tvOptions);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="error">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            Flicker.
          </Typography>
          {/* <Typography sx={styles.subtitle}>
            Films & TV
          </Typography> */}
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
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
          &nbsp;&nbsp;&nbsp;
          <Button
            color="secondary"
            onClick={() => toggleMoviesOrTV()}
            variant="contained"
          >
            Toggle Movies or TV
          </Button>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;