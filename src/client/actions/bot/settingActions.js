import {
    BOT_DETAIL
} from '../../constants/action-types';
import botApi from '../api/botApi';

export function getBotDetail (params) {
    return dispatch => {
        return go(
            params,
            params => botApi.getDetail('bot/detail', params),
            result => dispatch({
                type: BOT_DETAIL,
                payload: result.data.data
            })
        )
    }
}