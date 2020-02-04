import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Context from "../Context/Context";
import OtherUserProfile from './OtherUserProfile';
import PostList from '../PostList/PostList'


const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

class OtherUserUserProfileHome extends Component {
  static contextType = Context;

  render() {
    return (
      <Grid container>
      <Grid item xs={7} sm={7} style={{paddingTop: '30px', paddingLeft: '30px', paddingRight: '15px'}}>
        <OtherUserProfile />
      </Grid>
      <Grid item xs={6} sm={5} style={{paddingTop: '30px',paddingLeft: '15px', paddingRight: '25px'}}>
        <PostList />
      </Grid>
    </Grid>
    );
  }
}

export default withStyles(styles)(OtherUserUserProfileHome);
