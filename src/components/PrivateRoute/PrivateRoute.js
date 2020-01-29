import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuthForPrivateRoute } from './isAuthenticated';


const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => 
                checkAuthForPrivateRoute() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/sign-in' />
                )
            }

        />
    );
}

export default PrivateRoute;