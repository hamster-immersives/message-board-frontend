import React, {Component} from 'react'
import { withRouter} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import Context from '../Context/Context'

class OtherUserFollowProfileButton extends Component {
  static contextType = Context;

 

  followClick = () => {
   
  }
  unfollowClick = () => {
    
  }
  render() {


    let checkIfFollowed;

    // this.context.user.following.forEach(user => {
      
    // })


    return (<div>
      { checkIfFollowed
        ? (<Button variant="contained" color="secondary" onClick={this.unfollowClick}>Unfollow</Button>)
        : (<Button variant="contained" color="primary" onClick={this.followClick}>Follow</Button>)
      }
    </div>)
  }
}

export default withRouter(OtherUserFollowProfileButton)
