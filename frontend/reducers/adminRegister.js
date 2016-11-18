import { SET_ADMIN_FORM_XHR } from '../actions/index.js';

const adminRegister = (state = {
    isFetching: false,
    error: null
}, action) => {

    switch (action.type) {
        case SET_ADMIN_FORM_XHR:
            return Object.assign({}, state, { isFetching: action.isFetching, error: action.error });

        default:
            return state;
    }
};

export default adminRegister;
