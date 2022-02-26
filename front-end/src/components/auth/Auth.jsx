import React from 'react'
import { Register } from './Register';
import { Login } from './Login';
import { Row, Col } from 'react-bootstrap'
import imageLogin from '../../image/imageLogin.jpg'
import logo from '../../image/logo.png'
import '../css/login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const Auth = ({ authRoute }) => {
    const { authState: { authLoading, isAutithenticated } } = useContext(AuthContext)

    let body

    if (authLoading) {
        body = (
        <>
            <Spinner animation='border' variant = 'info'></Spinner>
        </>
        )
    }
    else {
        if (isAutithenticated) {
            return <Redirect to = '/dashboard'></Redirect>
        }
        else {
            body = (
                <>
                    {authRoute === 'register' ? <Register /> : <Login />}
                </>
            )
        }
    }

    return (
        <>
            <Row>
                <Col md={9} className='p-0'>
                    <img src={imageLogin} alt="imageLogin" className='imageLogin' />
                </Col>
                <Col md={3} className='formLogin'>
                    <img src={logo} alt="imageLogin" className='logo' />
                    {body}
                </Col>
            </Row>
        </>
    )
}

export default Auth
