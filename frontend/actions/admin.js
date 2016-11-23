import { submitAdminRegisterAPI } from './../api/api.js';

export const SET_ADMIN_FORM_XHR = 'SET_ADMIN_FORM_XHR';

export const setAdminFormXHR = (data) => ({
    type: SET_ADMIN_FORM_XHR,
    isFetching: data.isFetching,
    error: data.error || null
});

export const submitAdminRegister = function (data) {
    return function (dispatch) {
        dispatch(setAdminFormXHR({
            isFetching: true,
            error: null
        }));
        submitAdminRegisterAPI(data).then(
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
                appHistory.push('/');
            },
            function (response) {
                dispatch(setAdminFormXHR({
                    isFetching: false,
                    error: 'Error'
                }));
                console.log('XHR FAIL');
            }
        );
    };
};
