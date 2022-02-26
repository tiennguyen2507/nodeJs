import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import {
    Link,useHistory
} from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

export const Login = () => {
    //context
    const { loginUser } = useContext(AuthContext)

    //route history
    const history = useHistory()
    
    const [alert, setalert] = useState(null)

    const login = async event => {
        try {
            console.log(formLogin)
            const loginData = await loginUser(formLogin)
            if(loginData.success) {
                history.push('/dashboard')
                setalert({
                    type:'success',
                    message:loginData.message
                })
            }
            else {
                setalert({
                    type:'danger',
                    message:loginData.message
                })
            }
        } catch (error) {
            console.log(error)
        }
    }



 
    const [formLogin, setformLogin] = useState({
        userName: '',
        password: ''
    })

    const { userName, password } = formLogin

    const onChangeLoginForm = e => {
        setformLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='itemlogin'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" name='userName' value={userName} onChange={onChangeLoginForm} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" name='password' value={password} onChange={onChangeLoginForm} />
                </Form.Group>
                <AlertMessage info = {alert} />
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Lưu mât khẩu" />
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Đăng nhập
                </Button>
            </Form>
            <div className='cssRegist'>
                <Link to="/register" className='cssRegist'>Bạn chưa có tài khoản?</Link>
            </div>
        </div>
    )
}
