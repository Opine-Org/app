import { SET_ADMIN_FORM_XHR, CLEAR_ADMIN_FIELD_ERROR } from './../actions/admin.js';

import { objectRemoveKey } from './../libraries/Util.js';

const adminForm = (state = {
    isFetching: false,
    error: null,
    warning: null
}, action) => {

    switch (action.type) {
        case SET_ADMIN_FORM_XHR:
            return Object.assign({}, state, {
                isFetching: action.isFetching || false,
                error: action.error || null,
                warning: action.warning || null
            });

        case CLEAR_ADMIN_FIELD_ERROR:
            if (state.warning === null || !state.warning.fields[action.field]) {
                return state;
            }
            return Object.assign({}, state, {
                warning: {
                    fields: objectRemoveKey(state.warning.fields, action.field),
                    message: state.warning.message
                }
            });

        default:
            return state;
    }
};

export default adminForm;
