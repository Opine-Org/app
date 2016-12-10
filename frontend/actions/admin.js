import validate from 'validate.js';
import { adminRegister, adminLogin } from './../api/api.js';

export const SET_ADMIN_FORM_XHR = 'SET_ADMIN_FORM_XHR';
export const CLEAR_ADMIN_FIELD_ERROR = 'CLEAR_ADMIN_FIELD_ERROR';

export const setAdminFormXHR = (data) => ({
    type: SET_ADMIN_FORM_XHR,
    isFetching: data.isFetching,
    error: data.error || null,
    notice: data.notice || null
});

export const clearAdminFieldError = (data) => ({
    type: CLEAR_ADMIN_FIELD_ERROR,
    field: data
});

export const submitAdminLogin = (data) => {
    return (dispatch) => {
        // input validation
        const constraints = {
            email: {
                presence: true,
                email: true
            },
            password: {
                presence: true
            }
        };

        // if validation fails, send notices
        const notices = validate(data, constraints);
        if (notices) {
            dispatch(setAdminFormXHR({
                notice: {
                    fields: notices,
                    messages: validate(data, constraints, {format: 'flat'})
                }
            }));
            return;
        }

        // let the UI know that we a are fetching data
        dispatch(setAdminFormXHR({
            isFetching: true,
            error: null
        }));

        // call the login api end point
        adminLogin(data).then(

            // success case
            (response) => {

                // if an error occurred (but status 200 is given), show it as a notice
                if (response.status == 'error') {
                    dispatch(setAdminFormXHR({
                        isFetching: false,
                        error: null,
                        notice: { messages: response.notice.messages }
                    }));
                    return;
                }

                // clear everything
                dispatch(setAdminFormXHR({
                    isFetching: false,
                    error: null,
                    notice: null
                }));

                // set returned values to local storage
                localStorage.setItem('token', response.payload.token);
                appHistory.push('/admin');
            },

            // error case
            (request) => {
                const response = JSON.parse(request.response);
                let error = 'An error occurred.'
                if (response.error) {
                    error = response.error;
                }
                dispatch(setAdminFormXHR({
                    isFetching: false,
                    error: {
                        message: error
                    }
                }));
            }
        );
    };
};

export const submitAdminRegister = (data) => {
    return (dispatch) => {
        // input validation
        const constraints = {
            email: {
                presence: true,
                email: true
            },
            first_name: {
                presence: true
            },
            last_name: {
                presence: true
            },
            password: {
                presence: true,
                length: {
                    minimum: 8,
                    message: 'must be at least 8 characters'
                }
            },
            password2: {
                equality: 'password'
            }
        };

        // if validation fails, send notices
        const notices = validate(data, constraints);
        if (notices) {
            dispatch(setAdminFormXHR({
                notice: {
                    fields: notices,
                    messages: validate(data, constraints, {format: 'flat'})
                }
            }));
            return;
        }

        // let the UI know that we a are fetching data
        dispatch(setAdminFormXHR({
            isFetching: true,
            error: null
        }));

        adminRegister(data).then(

            // success case
            (response) => {

                // if an error occurred (but status 200 is given), show it as a notice
                if (response.status == 'error') {
                    dispatch(setAdminFormXHR({
                        isFetching: false,
                        error: null,
                        notice: { messages: response.notice.messages }
                    }));
                    return;
                }

                // clear everything
                dispatch(setAdminFormXHR({
                    isFetching: false,
                    error: null,
                    notice: null
                }));

                // set returned values to local storage
                localStorage.setItem('token', response.payload.token);
                appHistory.push('/admin');
            },

            // error case
            (request) => {
                const response = JSON.parse(request.response);
                let error = 'An error occurred.'
                if (response.error) {
                    error = response.error;
                }
                dispatch(setAdminFormXHR({
                    isFetching: false,
                    error: {
                        message: error
                    }
                }));
            }
        );
    };
};
