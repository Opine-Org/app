import base from './base.js';

export const submitAdminRegisterAPI = function (data) {
    return base.post('/api/admin/register', data);
};
