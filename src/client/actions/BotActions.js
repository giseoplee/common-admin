import axios from 'axios';
import {responseAction} from '../utils/common';

import {
    BOT_GET_LIST,
    BOT_GET_LIST_SUCCESS,
    BOT_GET_LIST_FAILURE,
    BOT_CREATE,
    BOT_CREATE_SUCCESS,
    BOT_CREATE_FAILURE,
    BOT_DELETE,
    BOT_DELETE_SUCCESS,
    BOT_DELETE_FAILURE,
    BOT_UPDATE,
    BOT_UPDATE_SUCCESS,
    BOT_UPDATE_FAILURE
} from '../constants/action-types';

export function getBotsRequest (id) {
    return async (dispatch) => {
        dispatch(getBots());

        return await axios.post('/bots/getbot', {id})
        .then(res => responseAction(dispatch, res.data.code, res.data.data, getBotSuccess, res.data.data.bot_list, getBotFailure))
        .catch(e => dispatch(getBotFailure()));
    };
}

export function getBots(){
    return {
        type: BOT_GET_LIST
    };
}

export function getBotSuccess(bots){
    return {
        type: BOT_GET_LIST_SUCCESS,
        bots
    };
}

export function getBotFailure () {
    return {
        type: BOT_GET_LIST_FAILURE
    };
}