import React, {Component} from 'react'

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


class FollowProfileButton extends Component {
  followClick = () => {
    
  }
  unfollowClick = () => {
    
  }
  render() {
    return (<div>
      { this.props.following
        ? (<Button variant="raised" color="secondary" onClick={this.unfollowClick}>Unfollow</Button>)
        : (<Button variant="raised" color="primary" onClick={this.followClick}>Follow</Button>)
      }
    </div>)
  }
}

export default FollowProfileButton
