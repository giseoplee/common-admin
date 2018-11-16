import * as types from '../constants/action-types';
import update from 'react-addons-update';

const initState = {
    jsonScenarioList: {
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
                jsonScenarioList: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.JSON_GET_SUCCESS:
            return update(state, {
                jsonScenarioList: {
                    status: {$set: 'SUCCESS'},
                    scenarios: {$set: JSON.stringify(action.testJson)}
                }
            });
        case types.JSON_GET_FAILURE:
            return update(state, {
                jsonScenarioList: {
                    status: {$set: 'FAILURE'}
                }
            });
        default:
            return state;
    }
}