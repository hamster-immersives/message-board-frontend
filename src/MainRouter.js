import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Nav from './components/Nav/Nav';
// import Home from './components/Home/Home';
//import Signin from './components/Signin/Signin';
// import Signup from './components/Signup/Signup';
import UserProfile from './components/UserProfile/UserProfile';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const Home = React.lazy(() => import('./components/Home/Home'))
const Signin = React.lazy(() => import('./components/Signin/Signin'))
const Signup = React.lazy(() => import('./components/Signup/Signup'))
const Profile = React.lazy(() => import('./components/Profile/Profile'))
const OtherUserProfileHome = React.lazy(() => import('./components/OtherUserProfile/OtherUserProfileHome'))


export default class MainRouter extends Component {
    render() {
        return (
            <>
                <Nav theme={this.props.theme} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/sign-up" component={Signup} />
                    <Route exact path="/sign-in" component={Signin} />

                    <PrivateRoute 
                        exact 
                        path='/user-profile'
                        component={Profile}
                        />

                    <PrivateRoute 
                        exact 
                        path='/user/:id'
                        component={OtherUserProfileHome}
                        />
                </Switch>
            </>
        )
    }
}
