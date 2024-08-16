import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { TVDetailsProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TVReviews from "../tvReviews";


const styles = {
    chipSet: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: 1.5,
      margin: 0,
    },
    chipLabel: {
      margin: 0.5,
    },
    fab: {
      marginTop: 8,
      position: "fixed",
      top: 37,
      right: 10,
    },
};

const TVDetails: React.FC<TVDetailsProps> = (tv) => {

    const [drawerOpen, setDrawerOpen] = useState(false); 

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tv.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tv.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${tv.episode_run_time} min.`} />
                <Chip
                    icon={<StarRate />}
                    label={`${tv.vote_average} (${tv.vote_count}`}
                />
                <Chip label={`Released: ${tv.first_air_date}`} />
                <Chip label={`Last Airing: ${tv.last_air_date}`} />
            </Paper>
            <Fab
                color="primary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <TVReviews {...tv} />
            </Drawer>
        </>
    );
};
export default TVDetails;