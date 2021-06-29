import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const GuardedRoute = (props) => {
    const { component: Component, ...rest } = props;

    const render = props => {
        console.log(props.auth.token)
        if (!props.auth.token) {
            return <Redirect to='/login' />;
        }
        return <Component {...props} />;
    };
    return <Route {...rest} render={render} />;
}

export default connect(mapStateToProps, null)(GuardedRoute);