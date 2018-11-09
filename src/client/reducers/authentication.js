import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initState = {
    login: {
        status: 'INIT'
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    }
}

export default function authentication (state, action) {
    if(typeof state === "undefined"){
        state = initState;
    }

    switch(action.type){
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: {$set: 'SUCCESS'}
                },
                status: {
                    isLoggedIn: {$set: true},
                    currentUser: {$set: action.account}
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: {$set: 'FAILURE'}
                }
            });
            case types.AUTH_GET_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: {$set: true} // true로 하는 이유: 잠시 로그인 상태가 아닌것으로 인식하기 때문에 깜박임 현상 생길 수 있으므로
                }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    valid: {$set: true},
                    currentUser: {$set: action.session.currentUser}
                }
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    valid: {$set:false},
                    isLoggedIn: {$set: false}
                }
            });
        case types.AUTH_LOGOUT:
            return update(state, {
                status: {
                    isLoggedIn: {$set: false},
                    currentUser: {$set: ''}
                }
            });
        default:
            return state;
    }
}

