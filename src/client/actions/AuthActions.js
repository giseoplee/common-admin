import axios from 'axios';
import {responseAction} from '../utils/common';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';

export function loginRequest (account, password) {
    return (dispatch) => {
        dispatch(login()); // login API start

        return axios.post('/auth/login', {account, password})
        .then(res => responseAction(dispatch, res, loginSuccess, res.data.data.user.id, loginFailure))
        .catch(e => dispatch(loginFailure()));
    };
}

export function login(){
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(account){
    return {
        type: AUTH_LOGIN_SUCCESS,
        account
    };
}

export function loginFailure () {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

export function getStatusRequest(){
    return (dispatch) => {
        dispatch(getStatus());

        return axios.post('/auth/getSession')
        .then(res => responseAction(dispatch, res, getStatusSuccess, res.data.data.session, getStatusFailure))
        .catch(e=>dispatch(getStatusFailure()));
    };
}

export function getStatus (){
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(session){
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        session
    }
}

export function getStatusFailure(){
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/auth/logout').then(res => dispatch(logout()));
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}