import authentication from './authentication';
import bot from './bot';
import parsing from './parsing';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    bot,
    parsing
});