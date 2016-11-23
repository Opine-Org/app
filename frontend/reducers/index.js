import { combineReducers } from 'redux';
import adminRegister from './adminRegister.js';

import { CHANGE_HISTORY } from './../actions/route.js';

const globalReducer = (currentState = initialState, action) => {
    switch (action.type) {
        case CHANGE_HISTORY:
            return Object.assign({}, currentState, action.payload);
        default:
            return currentState;
    }
};

const subReducers = combineReducers({
    adminRegister
});

export default function (currentState = initialState, action) {
    var nextState = globalReducer(currentState, action);
    if (action.type == CHANGE_HISTORY) {
        return nextState;
    }
    return subReducers(nextState, action);
};
