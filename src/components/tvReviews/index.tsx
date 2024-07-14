import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getTVReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { TVDetailsProps, Review, TVReview } from "../../types/interfaces"; 

const styles = {
    table: {
        minWidth: 550,
    },
};

const TVReviews: React.FC<TVDetailsProps> = (tv) => { 
    const [tvReviews, setTVReviews] = useState([]);

    useEffect(() => {
        getTVReviews(tv.id).then((reviews) => {
            setTVReviews(reviews);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="reviews table">
                <TableHead>
                    <TableRow>
                        <TableCell >Author</TableCell>
                        <TableCell align="center">Excerpt</TableCell>
                        <TableCell align="right">More</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tvReviews.map((r: TVReview) => (
                        <TableRow key={r.id}>
                            <TableCell component="th" scope="row">
                                {r.author}
                            </TableCell>
                            <TableCell >{excerpt(r.content)}</TableCell>
                            <TableCell >
                                <Link
                                    to={`/tvReviews/${r.id}`}
                                    state={{
                                        review: r,
                                        tv: tv,
                                    }}
                                >
                                    Full Review
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TVReviews;