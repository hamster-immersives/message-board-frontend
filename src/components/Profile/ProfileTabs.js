import React, {Component} from 'react'

import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FollowGrid from './FollowGrid'
import PostList from '../PostList/PostList'

class ProfileTabs extends Component {
  state = {
    tab: 0,
    posts: []
  }

  handleTabChange = (event, value) => {
    
  }

  render() {
    return (
    <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            fullwidth="true"
          >
            <Tab label="Posts" />
            <Tab label="Following" />
            <Tab label="Followers" />
          </Tabs>
        </AppBar>
       {this.state.tab === 0 && <TabContainer><PostList /></TabContainer>}

    </div>)
  }
}



const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}


export default ProfileTabs
