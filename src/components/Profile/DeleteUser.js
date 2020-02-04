import React, {Component} from 'react'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import {Redirect, Link} from 'react-router-dom'

class DeleteUser extends Component {
  state = {
    redirect: false,
    open: false
  }
  clickButton = () => {
    
  }
  deleteAccount = () => {

  }
  handleRequestClose = () => {
    
  }
  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/'/>
    }
    return (<span>
      <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={this.state.open} onClose={this.handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteAccount} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
  }
}

export default DeleteUser
