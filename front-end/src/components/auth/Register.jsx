import { Form, Button } from 'react-bootstrap'
import { useState,useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import {
    Link,useHistory
} from "react-router-dom";
import AlertMessage from '../layouts/AlertMessage'

export const Register = () => {
    //get và setdata formRegister
    const [formRegister, setformRegister] = useState({
        userName: '',
        password: '',
        rePassword: ''

    })
    const { userName, password, rePassword } = formRegister
    const onChangeformRegister = (e) =>{
        setformRegister({
            ...formRegister,
            [e.target.name] : e.target.value
        })
    }
     //route history
    const history = useHistory()

    const [alert, setalert] = useState(null)

    const { registerUser } = useContext(AuthContext)

    const register = async event => {
        if (password !== rePassword) {
            setalert({
                type:'danger',
                message: 'Nhập lại mật khẩu không chính xác!'
            })
            return
        }
        try {
            const registerData = await registerUser(formRegister)
            if(registerData.success) {
                history.push('/dashboard')
                setalert({
                    type:'success',
                    message:registerData.message
                })
            }
            else {
                setalert({
                    type:'danger',
                    message:registerData.message
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='itemlogin'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" name = 'userName' value = {userName} onChange={onChangeformRegister} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" name = 'password' value = {password} onChange={onChangeformRegister} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <Form.Control type="password" name = 'rePassword' value = {rePassword} onChange={onChangeformRegister} />
                </Form.Group>
                <AlertMessage info = {alert} />
                <Button variant="primary" onClick={register}>
                    Đăng ký
                </Button>
                <div className='cssRegist'>
                    <Link to="/login" className='cssRegist'>Bạn đã có tài khoản?</Link>
                </div>
            </Form>
        </div>
    )
}
