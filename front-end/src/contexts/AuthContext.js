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
                // console.log(authState)
            } catch (error) {
                // localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
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
    useEffect(() => loadUser(), [])

    

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

     //login
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


    //Context data
    const authContextData = { loginUser, authState, registerUser }
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider