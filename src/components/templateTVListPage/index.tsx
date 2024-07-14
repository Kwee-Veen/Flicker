import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import { TVListPageTemplateProps } from "../../types/interfaces";
import TVList from "../tvList";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  }
};

const TVListPageTemplate: React.FC<TVListPageTemplateProps> = ({ tv, name, action, increment, decrement }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={name} increment={increment} decrement={decrement}/>
      </Grid>
      <Grid item container spacing={5}>
        <TVList action={action} tv={tv}></TVList>
      </Grid>
    </Grid>
  );
}
export default TVListPageTemplate;