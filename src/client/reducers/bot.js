import * as types from '../constants/action-types';
import update from 'react-addons-update';

const initState = {
    jsonBotList: {
        status: 'INIT',
        bots: ''
    },
    information: {}
}

export default function bot (state, action) {
    
    if(typeof state === "undefined"){
        state = initState;
    }

    switch(action.type){
        case types.BOT_GET_LIST:
            return update(state, {
                jsonBotList: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.BOT_GET_LIST_SUCCESS:
            return update(state, {
                jsonBotList: {
                    status: {$set: 'SUCCESS'},
                    bots: {$set: JSON.stringify(action.bots)}
                }
            });
        case types.BOT_GET_LIST_FAILURE:
            return update(state, {
                jsonBotList: {
                    status: {$set: 'FAILURE'}
                }
            });
        case types.BOT_DETAIL:
            return update(state, {
                information: {
                    status: {$set: 'SUCCESS'},
                    data: {$set: action.payload}
                }
            });
        default:
            return state;
    }
}
