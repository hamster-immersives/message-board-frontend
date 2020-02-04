import React, {Component} from 'react'
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper'
import  {List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from '@material-ui/core'
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import Divider from "@material-ui/core/Divider";

import Context from "../Context/Context";
import {Redirect, Link, withRouter} from 'react-router-dom'
import OtherUserFollowProfileButton from './OtherUserFollowProfileButton'
import OtherUserProfileTabs from './OtherUserProfileTabs'
import Spinner from '../Spinner/Spinner';

import { checkTokenAuth, getUserProfileByID, followUser, unfollowUser } from '../lib/api'


const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: '1em'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
})

class OtherUserProfile extends Component {

  static contextType = Context;


    state = {
      user: {following:[], followers:[], username: '', email: '', id: ''},
      following: false,
      posts: [],
      isLoading: false
    }




  componentDidMount = async () => {

    try {

      await checkTokenAuth();
 
      let success = await getUserProfileByID(this.props.match.params.id);
      this.context.getAllPosts(success.fetchUserPost);
      this.setState({
        isLoading: true, 
        user: {
          following: success.fetchUserProfile.following, 
          followers: success.fetchUserProfile.followers,
          username: success.fetchUserProfile.username, 
          email: success.fetchUserProfile.email,
          _id: success.fetchUserProfile._id
        }
      })


    } catch (e) {
      console.log(e)
    }
 
  }

  clickFollowButton = async () => {
   
  }

  clickUnfollowButton = async () => {

   

  }

  render() {
    const {classes} = this.props

    // const photoUrl = this.state.user._id
    //           ? `/api/users/photo/${this.state.user._id}?${new Date().getTime()}`
    //           : '/api/users/defaultphoto'
    let photoUrl;
    let isLoading;
    if (!this.state.isLoading) {
       isLoading = <Spinner />
    } else {
      isLoading = (
        <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          User Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={photoUrl} className={classes.bigAvatar}/>
            </ListItemAvatar>
            <ListItemText primary={this.state.user.username} secondary={this.state.user.email}/> 
            <OtherUserFollowProfileButton 
              variant="contained" 
              following={this.state.user.following} 
              onButtonFollow={this.clickFollowButton}
              onButtonUnfollow={this.clickUnfollowButton}
              />
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText secondary={'Joined: ' + this.context.user.userCreated}
              />
          </ListItem>
        </List>
        <OtherUserProfileTabs user={this.state.user} />
      </Paper>
      )
    }

    return (
      <>
      {isLoading}
      </>
    )
  }
}


export default withStyles(styles)(withRouter(OtherUserProfile))

