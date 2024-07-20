import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MenuOptions } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import { PagesContext } from "../../contexts/pagesContext";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 1.5,
    },
};

interface HeaderProps {
    title: string;
    increment?: Function;
    decrement?: Function;
}

const Header: React.FC<HeaderProps> = (headerProps) => {
    const genres: MenuOptions[] = useContext(MoviesContext).movieGenres;
    const title = headerProps.title;
    let increment: Function | null = null;
    if (headerProps.increment !== undefined) increment = headerProps.increment
    let decrement: Function | null = null;
    if (headerProps.decrement !== undefined) decrement = headerProps.decrement
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    // TODO 3: Have a second parameter passed into the api get request; whether it's tv or movie.
    // TODO 3b: Optional - also pass in a third parameter, whether it's discover or trending or upcoming (for movies only) 
    // TODO 4: Only have this dropdown appear where appropriate; remove from detail-pages, favourite pages
    // TODO 5: UI, have it not displace the page title as jankily
    // FIX 1: Display the name of the genre on the moviesByGenrePage somewhere. Maybe add another element to 'state' on line 85
    
    const { setMoviesByGenrePageCount } = useContext(PagesContext);

    const handleMenuItemClick = (
      index: number,
      path: string
    ) => {
      setSelectedIndex(index);
      setAnchorEl(null);

      setMoviesByGenrePageCount(1);
      navigate(`/movies/genre/${path}`, {state:{genreId: path}});
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Paper component="div" sx={styles.root}>
            {decrement &&
              <IconButton
                  aria-label="go back" onClick={() => { decrement(); }}
              >
                  <ArrowBackIcon color="primary" fontSize="large" />
              </IconButton>
            }

            <Typography variant="h4" component="h3">
                {title}
            </Typography>

            <span>
              <List
                component="nav"
              >
                <ListItemButton
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="Search by Genre"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickListItem}
                  sx={{ bgcolor: 'lavender', borderRadius: 2, maxHeight: 55, }}
                >
                  <ListItemText
                    primary="Genre Search"
                    secondary={genres[selectedIndex].label}
                  />
                </ListItemButton>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                {genres.map((genre, index) => (
                  <MenuItem
                    key={genre.label}
                    disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={() => handleMenuItemClick(index, genre.path)}
                  >
                    {genre.label}
                  </MenuItem>
                ))}
              </Menu>
            </span>

            {increment &&
                <IconButton
                  aria-label="go forward"  onClick={() => { increment(); }}
              >
                  <ArrowForwardIcon color="primary" fontSize="large"/>
              </IconButton>
            }
        </Paper>
    );
};

export default Header;