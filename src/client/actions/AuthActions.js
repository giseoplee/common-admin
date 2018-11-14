import axios from 'axios';

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
        .then(res => {

            if(res.data.code !== '9000' &&  res.data.data !== null){
                dispatch(loginSuccess(res.data.data.user.id));
            }
            else{
                dispatch(loginFailure());
            }
            
        })
        .catch(e => {
            console.log(e.message);
            dispatch(loginFailure());
        });
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
        .then(res => {res.data.data !== null? dispatch(getStatusSuccess(res.data.data.session)) : dispatch(getStatusFailure())})
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