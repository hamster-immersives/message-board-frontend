import React, {Component} from 'react'
import { withStyles } from "@material-ui/core/styles";
import  {List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from '@material-ui/core'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Link} from 'react-router-dom'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  }
})
class FollowGrid extends Component {
  render() {
    const {classes} = this.props
    return (<div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {this.props.people.map((person, i) => {
           return  <GridListTile style={{'height':120}} key={i}>
              <Link to={"/user/" + person._id}>
                <Avatar src={'/api/users/photo/'+person._id} className={classes.bigAvatar}/>
                <Typography className={classes.tileText}>{person.username}</Typography>
              </Link>
            </GridListTile>
        })}
      </GridList>
    </div>)
  }
}


export default withStyles(styles)(FollowGrid)
