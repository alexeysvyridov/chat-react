import React, { ReactElement } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { ROUTES } from '../constants/constants'

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: {
    component: React.ComponentType<RouteProps>,
    isAuthenticated: boolean,
    path: string,
    exact?: boolean
}): ReactElement => {

    const render = (props: any) => {
        if (!isAuthenticated) {
            return <Redirect to={ROUTES.LOGIN} />;
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={render} />
}