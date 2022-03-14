import React from 'react';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from './types';

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true
            }
        case REGISTER_FAIL:
            localStorage.setItem('token', null);
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state;
    }
}