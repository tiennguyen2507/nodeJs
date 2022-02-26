import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Spinner } from 'react-bootstrap';
import NavbarMenu from '../layouts/NavbarMenu';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const { authState: { authLoading, isAutithenticated } } = useContext(AuthContext)
    if (authLoading) {
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant = 'info'></Spinner>
            </div>
        )
    }

    return <div>
        <Route {...rest} render={props => isAutithenticated ? (
            <>  
                <NavbarMenu />
                <Component {...rest} {...props}/>
            </>
        ) : (<>
            <Redirect to = '/' />
        </>)}/>

    </div>;
};

export default ProtectedRoute;
