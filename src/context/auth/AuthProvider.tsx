import { ReactNode, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from "../"
import { IUser } from '@/interfaces';
import { tesloApi } from '@/apis';


export interface AuthState {
    isLoggedIn: boolean
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const router = useRouter()
    const { data, status } = useSession()

    useEffect(() => {
        if( status === 'authenticated' ){
            dispatch({ type: 'AUTH - Login', payload: data?.user as IUser })
        }
    }, [status, data])
    

    // useEffect(() => {
    //     checkToken()
    // }, [])

    const checkToken = async() => {

        if( !Cookies.get('token') ){ return }

        try {
                const { data } = await tesloApi.get('/users/validate-token')
                const { token, user } = data
                Cookies.set('token', token)
                dispatch({ type: 'AUTH - Login', payload: user })
        } catch (error) {
            Cookies.remove('token')
        }

    }


    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {

            const { data } = await tesloApi.post('/users/login', { email, password })
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: 'AUTH - Login', payload: user })

            return true
        } catch (error) {
            return false
        }

    }

    const registerUser = async( name: string, email: string, password: string ): Promise<{ hasError: boolean, message?: string }> => {

        try {

            const { data } = await tesloApi.post('/users/register', { name, email, password })
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: 'AUTH - Login', payload: user })
            return {
                hasError: false
            }

        } catch (error) {
            if( axios.isAxiosError(error) ){
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'Could not create user - Try again please'
            }
        }
    }

    const logoutUser = () => {
        Cookies.remove('cart')
        Cookies.remove('firstName')
        Cookies.remove('lastName')
        Cookies.remove('address')
        Cookies.remove('address2')
        Cookies.remove('zip')
        Cookies.remove('city')
        Cookies.remove('country')
        Cookies.remove('phone')
        signOut()
        
    }

    return (
        <AuthContext.Provider value={{ ...state, loginUser, registerUser, logoutUser }}>
            { children }
        </AuthContext.Provider>
    )
}