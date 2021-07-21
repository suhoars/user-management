import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from './localStorage';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            getUser('user')
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login'}} />
        )} />
    )   
}