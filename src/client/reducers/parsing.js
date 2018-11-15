import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initState = {
    scenario_list: {
        status: 'INIT',
        scenarios: ''
    }
}

export default function parsing (state, action) {
    if(typeof state === "undefined"){
        state = initState;
    }

    switch(action.type){
        case types.JSON_GET:
            return update(state, {
                scenario_list: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.JSON_GET_SUCCESS:
            return update(state, {
                scenario_list: {
                    status: {$set: 'SUCCESS'},
                    scenarios: {$set: JSON.stringify(action.testJson)}
                }
            });
        case types.JSON_GET_FAILURE:
            return update(state, {
                scenario_list: {
                    status: {$set: 'FAILURE'}
                }
            });
        default:
            return state;
    }
}