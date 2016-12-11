import { SET_ADMIN_FORM_XHR, CLEAR_ADMIN_FIELD_ERROR } from './../actions/admin.js';

import { objectRemoveKey } from './../libraries/Util.js';

const adminForm = (state = { isFetching: false, error: null, notice: null}, action) => {

    switch (action.type) {
        case SET_ADMIN_FORM_XHR:
            return Object.assign({}, state, {
                isFetching: action.isFetching || false,
                error: action.error || null,
                notice: action.notice || null
            });

        case CLEAR_ADMIN_FIELD_ERROR:
            if (state.notice == null || !state.notice.fields || !state.notice.fields[action.field]) {
                return state;
            }
            return Object.assign({}, state, {
                notice: {
                    fields: objectRemoveKey(state.notice.fields, action.field),
                    messages: state.notice.messages
                }
            });

        default:
            return state;
    }
};

const adminDashboard = (state = {session: [], qualifications: [], widgets: []}, action) => {

    console.log('CALLED adminDashboard');

    return state;
};

export default adminForm;
