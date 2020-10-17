import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';
import Cookies from 'js-cookie';

console.log("hello wolrd");
const user = Cookies.get("user");
console.log(user);
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated()  || user != undefined) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to={{
                        pathname: '/',
                        state: {
                            from: props.location
                        }
                    }
                    }
                    />
                }
            }}
        />
    )
}