import React, {Component} from 'react'

import { CardHeader } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from '@material-ui/icons/Delete';

import {withStyles} from '@material-ui/core/styles'

import {Link} from 'react-router-dom'

import { addCommentToPostByID, deleteCommentByID } from '../lib/api';

import Context from '../Context/Context'

const styles = theme => ({
  cardHeader: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
    padding: theme.spacing(),
    margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
 },
 commentDelete: {
   fontSize: '1.6em',
   verticalAlign: 'middle',
   cursor: 'pointer'
 },
 userLink: {
   textDecoration: 'none'
 }
})

class Comments extends Component {
  static contextType = Context;
  state = {text: ''}
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  addComment = async (event) => {

    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      try {
        let commentInfo = {
          postID: this.props.postID, 
          comment: this.state.text
        }
        let success = await addCommentToPostByID(commentInfo);
        this.props.updateComments(success.comments);
        this.setState({
          text: ''
        })
      } catch (e) {
        console.log(e);
      }
    }
  }

  deleteComment = comment => async event => {

    try {

      let success = await deleteCommentByID(this.props.postID, comment._id);
      
      this.props.updateComments(success)
      
    } catch (e) {
      console.log(e);
    }

  }
  render() {
    const {classes} = this.props
    const { user } = this.context
    const commentBody = item => {
      console.log(item)
      return (
        <p className={classes.commentText}>
        <Link to={''} className={classes.userLink}></Link><br/>
        {item.text}
        <span className={classes.commentDate}>
          {item.created} |
          {
            user.id === item.postedBy._id &&
            <DeleteIcon onClick={this.deleteComment(item)} className={classes.commentDelete} />
          }
        </span>
      </p>
      )
    }

    return (<div>
        <CardHeader
              avatar={
                <Avatar className={classes.smallAvatar} src={''}/>
              }
              title={ <TextField
                onKeyDown={this.addComment}
                multiline
                value={this.state.text}
                onChange={this.handleChange('text')}
                placeholder="Write something ..."
                className={classes.commentField}
                margin="normal"
                />}
              className={classes.cardHeader}
        />
        { this.props.comments.map((item, i) => {
            return <CardHeader
                      avatar={
                        <Avatar className={classes.smallAvatar} src={''}/>
                      }
                      title={commentBody(item)}
                      className={classes.cardHeader}
                      key={i}/>
              })
        }
    </div>)
  }
}


export default withStyles(styles)(Comments)
