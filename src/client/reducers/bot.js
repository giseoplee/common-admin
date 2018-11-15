import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initState = {
    bot_list: {
        status: 'INIT',
        bots: ''
    }
}

export default function bot (state, action) {
    if(typeof state === "undefined"){
        state = initState;
    }

    switch(action.type){
        case types.BOT_GET_LIST:
            return update(state, {
                bot_list: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.BOT_GET_LIST_SUCCESS:
            return update(state, {
                bot_list: {
                    status: {$set: 'SUCCESS'},
                    bots: {$set: JSON.stringify(action.bots)}
                }
            });
        case types.BOT_GET_LIST_FAILURE:
            return update(state, {
                bot_list: {
                    status: {$set: 'FAILURE'}
                }
            });
        default:
            return state;
    }
}