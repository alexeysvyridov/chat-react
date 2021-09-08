import React, { ReactElement } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { ROUTES } from '../constants/constants';

export const PublickRoute = ({ component: Component, isAuthenticated, restricted = false, ...rest }: {
    component: React.ComponentType<RouteProps>,
    isAuthenticated: boolean,
    path: string,
    restricted?: boolean
    exact?: boolean
}): ReactElement => {
    const render = (props: any) => {
        if (isAuthenticated && restricted) {
            return <Redirect to={ROUTES.HOME} />;
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={render} />
}
