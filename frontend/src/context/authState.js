import React, { Children, useReducer } from 'react';
import axios from 'axios';

import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from './types';

import AuthContext from './authContext';

axios.defaults.withCredentials = true;
const AuthState = (props) => {
    const initialState = {
        isAuthenticated: false,
        token: localStorage.getItem('token'),
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const res = await axios.post('http://localhost:8080/user/createAccount', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            console.log(res);
            return res;
        }
        catch (err) {
            return err.response;
        }
    }
    const loginUser = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const res = await axios.post('http://localhost:8080/user/login', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            console.log(res.data.token);
            return res;
        }
        catch (err) {
            console.log(err);
            return err.response;
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: state.isAuthenticated,
            register,
            loginUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;