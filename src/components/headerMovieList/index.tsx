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
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import NumberInput from "../numberInputBox";

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
  showSearch: boolean;
}

const Header: React.FC<HeaderProps> = (headerProps) => {
  const navigate = useNavigate();
  const genres: MenuOptions[] = useContext(MoviesContext).movieGenres;
  const sortOptions: MenuOptions[] = useContext(MoviesContext).sortOptions;
  const title = headerProps.title;
  const showSearch = headerProps.showSearch;

  let increment: Function | null = null;
  if (headerProps.increment !== undefined) increment = headerProps.increment;
  let decrement: Function | null = null;
  if (headerProps.decrement !== undefined) decrement = headerProps.decrement;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openSort = Boolean(sortAnchorEl);
  const handleClickSortListItem = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const { setMoviesSearchPageCount, setCurrentPageIsMovie } = useContext(PagesContext);
  const { tempVoteAverage, setVoteAverage, setGenreId, genreLabel, setGenreLabel, setSortBy, sortByLabel, setSortByLabel } = useContext(MoviesContext);
  const [tempGenreLabel, setTempGenreLabel] = React.useState<string | undefined>(genreLabel);
  const [tempGenreId, setTempGenreId] = React.useState<string | number | undefined>(undefined);
  const [tempSortBy, setTempSortBy] = React.useState<string | undefined>(undefined);
  const [tempSortByLabel, setTempSortByLabel] = React.useState<string | undefined>(undefined);

  // globally accessible flag that the currently active page is a movie 
  setCurrentPageIsMovie(1);

  const handleGenreClick = (
    index: number,
    path: string | number,
    label: string,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setTempGenreId(path);
    setTempGenreLabel(label);
  };

  const handleSortClick = (
    path: string,
    label: string,
  ) => {
    setTempSortBy(path);
    setTempSortByLabel(label);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSort = () => {
    setSortAnchorEl(null);
  };

  const handleSearchClick = () => {
    setMoviesSearchPageCount(1);
    setGenreId(tempGenreId);
    setGenreLabel(tempGenreLabel);
    setVoteAverage(tempVoteAverage);
    if (tempSortBy) setSortBy(tempSortBy);
    if (tempSortByLabel) setSortByLabel(tempSortByLabel);
    navigate(`/`);
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

      <Typography variant="h5" align="right">
        {title}
      </Typography>

      {showSearch && <span>
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
              primary="Genre"
              secondary={tempGenreLabel? tempGenreLabel : genreLabel }
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
              onClick={() => handleGenreClick(index, genre.path, genre.label)}
            >
              {genre.label}
            </MenuItem>
          ))}
        </Menu>
      </span>}

      {showSearch &&
        <span>
          <List component="nav">
            <ListItemButton
              id="lock-button-sort"
              aria-haspopup="listbox"
              aria-controls="lock-menu-sort"
              aria-label="Sort By"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickSortListItem}
              sx={{ bgcolor: 'lavender', borderRadius: 2, maxHeight: 55, }}
            >
              <ListItemText
                primary="Sort By"
                secondary={tempSortByLabel || sortByLabel}
              />
            </ListItemButton>
          </List>
          <Menu
            id="lock-menu-sort"
            anchorEl={sortAnchorEl}
            open={openSort}
            onClose={handleCloseSort}
            MenuListProps={{
              'aria-labelledby': 'lock-button-sort',
              role: 'listbox',
            }}
          >
            {sortOptions.map((option, index) => (
              <MenuItem
                key={option.label}
                selected={index === selectedIndex}
                onClick={() => handleSortClick(option.path as string, option.label)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </span>
      }

      {showSearch && <NumberInput ></NumberInput>}

      {showSearch &&
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => handleSearchClick()}
          sx={{ bgcolor: 'Indigo', borderRadius: 2, maxHeight: 55, }}
        >
          Search
        </Button>
      }

      {increment &&
        <IconButton
          aria-label="go forward" onClick={() => { increment(); }}
        >
          <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>
      }
      &nbsp;
    </Paper>
  );
};

export default Header;