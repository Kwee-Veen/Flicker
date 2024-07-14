import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseTVProps } from "../../types/interfaces";
import FilterTVCard from "../filterTVCard";

export const nameFilter = (tv: BaseTVProps, value: string): boolean => {
    return tv.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (tv: BaseTVProps, value: string) => {
    const genreId = Number(value);
    const genreIds = tv.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface tvFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    nameFilter: string;
    genreFilter: string;
}


const TVFilterUI: React.FC<tvFilterUIProps> = ({ onFilterValuesChange, nameFilter, genreFilter }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterTVCard
                    onUserInput={onFilterValuesChange}
                    nameFilter={nameFilter}
                    genreFilter={genreFilter}
                />
            </Drawer>
        </>
    );
};

export default TVFilterUI;