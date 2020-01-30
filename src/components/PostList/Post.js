import React, {Component} from 'react'
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider'
import jwt_decode from 'jwt-decode';

import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'

import Comments from './Comments'
import Context from "../Context/Context";

import { deletePostByID, likeButton, unlikeButton } from '../lib/api'

const styles = theme => ({
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)'
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing(2)}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  text: {
    margin: theme.spacing(2)
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding:theme.spacing()
  },
  media: {
    height: 200
  },
  button: {
   margin: theme.spacing(),
  }
})

class Post extends Component {
  static contextType = Context;

  state = {
    like: false,
    likes: 0,
    comments: []
  }

  componentDidMount () {
    this.setState({
      comments: this.props.post.comments,
      likes: this.props.post.likes.length,
      like: this.checkLike(this.props.post.likes)
    })
  }

  checkLike = (likesArray) => {
    // let token = localStorage.getItem('jwtToken-reddit');
    // let user = jwt_decode(token);
    let match = likesArray.indexOf(this.context.user.id) !== -1;
    return match;
  }

  like = async () => {

    let likeAndUnlikeApiCall = this.state.like ? unlikeButton : likeButton;

    try {

      let success = await likeAndUnlikeApiCall(this.props.post._id);
      console.log(success)
      this.setState({
        likes: success.likes.length,
        like: this.checkLike(success.likes)
      })

      this.context.updatePostArray(success);

    } catch (e) {
      console.log(e);
    }


  }

  updateComments = (comments) => {
    this.setState({comments: comments})
  }

  deletePost = async () => {
    try {
        let success = await deletePostByID(this.props.post._id)
        this.context.deletePostByID(success)
    } catch (e) {
        console.log(e);
    }
  }
  render() {
    const {classes} = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
            avatar={
              <Avatar src={''}/>
            }
            action={this.props.post.postedBy._id === this.context.user.id &&
              <IconButton onClick={this.deletePost}>
                <DeleteIcon />
              </IconButton>
            }
            title={<Link to={''}>{this.props.post.postedBy.name}</Link>}
            title={<Link to={''}>{this.props.post.username}</Link>}
            subheader={this.props.post.created}
            className={classes.cardHeader}
          />
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            {this.props.post.text}
          </Typography>
          {this.props.post.photo &&
            (<div className={classes.photo}>
              <img
                className={classes.media}
                src={this.props.post.photo}
                alt="something"
                />
            </div>)}
        </CardContent>
        <CardActions>
          { this.state.like
            ? <IconButton onClick={this.like} className={classes.button} aria-label="Like" color="secondary">
                <FavoriteIcon />
              </IconButton>
            : <IconButton onClick={this.like} className={classes.button} aria-label="Unlike" color="secondary">
                <FavoriteBorderIcon />
              </IconButton> } <span>{this.state.likes}</span>
              <IconButton className={classes.button} aria-label="Comment" color="secondary">
                <CommentIcon/>
              </IconButton> <span>{this.state.comments.length}</span>
        </CardActions>
        <Divider/>
        <Comments postID={this.props.post._id} comments={this.state.comments} updateComments={this.updateComments}/>
      </Card>
    )
  }
}

export default withStyles(styles)(Post)
