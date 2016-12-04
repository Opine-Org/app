import base from './base.js';

export const adminRegister = function (data) {
    return base.post('/api/admin/register', data);
};

export const adminLogin = function (data) {
    return base.post('/api/admin/login', data);
};
