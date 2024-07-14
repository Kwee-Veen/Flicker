import React from "react";
import Grid from "@mui/material/Grid";
import { BaseTVListProps } from "../../types/interfaces";
import TVCard from "../tvCard";

const TVList: React.FC<BaseTVListProps> = ({tv, action}) => {
  let tvCards = tv.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
       <TVCard key={m.id} tv={m} action={action}/>
    </Grid>
  ));
  return tvCards;
}

  export default TVList;