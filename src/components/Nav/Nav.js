import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';

import { NavLink, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Context from '../Context/Context';

import './Nav.css'

const styles = theme => ({
    grow: {
        flexGrow: 1
    }, 
    icon: {
       margin: theme.spacing(2.5),
       fontSize: 28
    }
})

const isActive = (history, path) => {
    if (history.location.pathname === path) 
        return {color: 'white'}
    else 
        return {color: '#ffffff'}
}

class Nav extends Component {
    
    static contextType = Context;

    componentDidMount() {
        console.log(this.context.isAuth)
    }

    render() {
        const { history, classes, theme } = this.props; 
        const { isAuth, logout } = this.context;
        let nav; 

        if (isAuth) {
            nav = (
                <>
                    <NavLink to='/user-profile' exact activeClassName="class-active-nav-link" className="class-nav-link">
                       {this.context.user.username}
                    </NavLink>
                    <NavLink onClick={logout} exact activeClassName="class-active-nav-link" className="class-nav-link">
                        Log out
                    </NavLink>
                </>
            ) 
        } else {
            nav = (
                <>
                    <NavLink to='/sign-up' exact activeClassName="class-active-nav-link" className="class-nav-link">
                        Sign up
                    </NavLink>
                    <NavLink to='/sign-in' exact activeClassName="class-active-nav-link" className="class-nav-link">
                        Sign in
                    </NavLink>
                </>
            )
        }

        let activeHistoryStyleFunc;
      
        if (history.location.pathname === '/') {
            activeHistoryStyleFunc = isActive(history, '/');
        } 
        return (
            <AppBar position="static">
                <Toolbar type='title' color='inherit'>
                    <Typography>
                        Reddit before the real Reddit
                    </Typography>
                <NavLink to="/" exact>
                    <IconButton aria-label="Home" className={classes.icon}>
                        <HomeIcon style={activeHistoryStyleFunc}/>
                    </IconButton>
                </NavLink>

                {nav}

                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(withStyles(styles)(Nav))