import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducer/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken";


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAutithenticated: false,
        user: null
    })

    //autithencate user
    const loadUser = async () => {
        console.log('loadUser')
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
            try {
                const reponse = await axios.get(`${apiUrl}/auth`)
                if (reponse.data.success) {
                    dispatch({
                        type: 'SET_AUTH',
                        payload: {
                            authLoading: false,
                            isAutithenticated: true,
                            user: reponse.data.user
                        }
                    })
                }
                else{
                    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
                    dispatch({
                        type: 'SET_AUTH',
                        payload: {
                            authLoading: false,
                            isAutithenticated: false
                        }
                    })
                }

                console.log(authState)
            } catch (error) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
                setAuthToken(null)
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        authLoading: false,
                        isAutithenticated: false,
                        user: null
                    }
                })
            }
        }
        else {
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    authLoading: false,
                    isAutithenticated: false,
                    user: null
                }
            })
        }
    }
    useEffect(() => loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [])

    

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }

            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {
                success: false,
                message: error.message
            }
        }
    }

     //register
     const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }

            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {
                success: false,
                message: error.message
            }
        }
    }

    //log out
    const logOut = () =>{
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: {
                authLoading: false,
                isAutithenticated: false,
                user: null
            }
        })
    }


    //Context data
    const authContextData = { loginUser, authState, registerUser,logOut }
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider