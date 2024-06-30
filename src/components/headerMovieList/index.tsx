import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { MoviesContext } from "../../contexts/moviesContext";


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
}

// TODO: This currently sets the PopularMoviesPageCount page only, despite this header featuring
// in every page. Refactor such that each page has a header that'll handle that particular page's pagination.
const Header: React.FC<HeaderProps> = (headerProps) => {
    const title = headerProps.title;
    const { incrementPopularMoviesPageCount } = useContext(MoviesContext);
    const { decrementPopularMoviesPageCount } = useContext(MoviesContext);

    return (
        <Paper component="div" sx={styles.root}>
            <IconButton
                aria-label="go back" onClick={() => { decrementPopularMoviesPageCount(); }}
            >
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3">
                {title}
            </Typography>
            <IconButton
                aria-label="go forward"  onClick={() => { incrementPopularMoviesPageCount(); }}
            >
                <ArrowForwardIcon color="primary" fontSize="large"/>
            </IconButton>
        </Paper>
    );
};

export default Header;