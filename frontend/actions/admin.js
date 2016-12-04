import validate from 'validate.js';
import { adminRegister, adminLogin } from './../api/api.js';

export const SET_ADMIN_FORM_XHR = 'SET_ADMIN_FORM_XHR';
export const CLEAR_ADMIN_FIELD_ERROR = 'CLEAR_ADMIN_FIELD_ERROR';

export const setAdminFormXHR = (data) => ({
    type: SET_ADMIN_FORM_XHR,
    isFetching: data.isFetching,
    error: data.error || null,
    warning: data.warning || null
});

export const clearAdminFieldError = (data) => ({
    type: CLEAR_ADMIN_FIELD_ERROR,
    field: data
});

export const submitAdminLogin = function (data) {
    return function (dispatch) {

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

        // if validation fails, send warnings
        const warnings = validate(data, constraints);
        if (warnings) {
            dispatch(setAdminFormXHR({
                warning: {
                    fields: warnings,
                    message: validate(data, constraints, {format: "flat"})
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
            function (response) {
                // if an error occurred (but status 200 is given), show it as a warning
                if (response.status == 'error') {
                    dispatch(setAdminFormXHR({
                        isFetching: false,
                        error: null,
                        warning: { message: [response.error] }
                    }));
                    return;
                }

                // success
                dispatch(setAdminFormXHR({
                    isFetching: false,
                    error: null,
                    warning: null
                }));
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify({
                    first_name: response.first_name,
                    last_name: response.last_name,
                    email: response.email
                }));
                appHistory.push('/admin');
            },
            function (request) {
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

export const submitAdminRegister = function (data) {
    return function (dispatch) {

        // input validation

        dispatch(setAdminFormXHR({
            isFetching: true,
            error: null
        }));
        adminRegister(data).then(
            function (response) {
                dispatch(setAdminFormXHR({
                    isFetching: false,
                    error: null
                }));
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify({
                    first_name: response.first_name,
                    last_name: response.last_name,
                    email: response.email
                }));
                appHistory.push('/admin');
            },
            function (response) {
                dispatch(setAdminFormXHR({
                    isFetching: false,
                    error: 'Error'
                }));
            }
        );
    };
};
