import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return(
        <Route { ...rest } render={props => {
            if (localStorage.getItem('token')){
                // Token exists - user is authenticated
                return <Component { ...props } />;
            } else{
                // Token does not exist - user has not been authenticated
                return <Redirect to="/login" />;
                }
            }
        }/>
    )
}

export default PrivateRoute;
