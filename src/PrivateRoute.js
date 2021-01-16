import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { accountService } from './services/account';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => {
            console.log("props.location", props.location)
            const account = accountService.accountValue;

            if (!account) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };