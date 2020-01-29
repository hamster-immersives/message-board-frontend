import React, {Component} from 'react'
import { Card, CardActions, CardContent, CardHeader } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";
import ErrorIcon from "@material-ui/icons/Error";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import Notifications, { notify } from "react-notify-toast";

import Context from "../Context/Context";
import { createPost } from '../lib/api';


const errorToastColor = {
  background: "#f23535",
  text: "#fff",
};

const toastColor = {
  background: "#3f51b5",
  text: "#fff",
};

const styles = theme => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%'
  },
  submit: {
    margin: theme.spacing(2)
  },
  filename:{
    verticalAlign: 'super'
  },
  imageName: {
    fontSize: 8,
    marginLeft: 5
  }
})

class NewPost extends Component {

  static contextType = Context;

  state = {
    text: '',
    photoName: ''
  }

  componentDidMount = () => {

    this.toast = notify.createShowQueue();
    this.formData = new FormData();

  }

  handleSubmitPost = async (event) => {
    
    let stateObj = this.state;
    
    for (let key in stateObj) {
      this.formData.set(key, stateObj[key]);
    }
    
    try {
      let success = await createPost(this.formData);
      this.context.createPost(success)
    } catch (e) {
      console.log(e);
    }

  }
  handleChange = name => event => {
    this.setState({
      'text': event.target.value
    })

  }

  handleFileUpload = event => {
   
    let errs = [];
    const files = event.target.files;

    //ONLY ONE UPLOAD IS ALLOWED 
    if (files.length > 1) {
      errs.push('Only 1 image is allowed');
    }

    //SECOND IS check image types only allow JPEG JPG and PNG 
    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    
      if (types.every(type => files[0].type !== type)) {
        errs.push(`${files[0].type} is not supported format`);
      }

    //Check file Size 
      if (files[0].size > 150000) {
        errs.push(`${files[0].name} is too large, please pick a smaller file`);
      }
    //


    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 4000, errorToastColor))
    } else {

      this.formData.set('photo', files[0]);
      const msg = `${files[0].name} file attached!`;
      this.toast(msg, 'custom', 2000, toastColor);

      this.setState({
        photoName: files[0].name
      })
    }
  };

  render() {
    const {classes} = this.props
    return (<div className={classes.root}>

      <Notifications options={{zIndex: 200, top: '90px'}} />
      
      <Card className={classes.card}>
      <CardHeader
            avatar={
              <Avatar src={''}/>
            }
            title={this.context.user.username}
            className={classes.cardHeader}
          />
      <CardContent className={classes.cardContent}>
        <TextField
            placeholder="Share your thoughts ..."
            multiline
            rows="3"
            value={this.state.text}
            onChange={this.handleChange('text')}
            className={classes.textField}
            margin="normal"
        />
        <input accept="image/*" onChange={this.handleFileUpload} className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="secondary" className={classes.photoButton} component="span">
            <PhotoCameraIcon /> {this.state.photoName && <span className={classes.imageName}>{this.state.photoName}</span>}
          </IconButton>
        </label> <span className={classes.filename}>{this.state.photo ? this.state.photo.name : ''}</span>
        { this.state.error && (<Typography component="p" color="error">
            <ErrorIcon color="error" className={classes.error}>error</ErrorIcon>
              {this.state.error}
            </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button 
          color="primary" 
          variant="contained"  
          onClick={this.handleSubmitPost} 
          disabled={this.state.text === ''}
          className={classes.submit}>POST</Button>
      </CardActions>
    </Card>
  </div>)
  }
}


export default withStyles(styles)(NewPost)
