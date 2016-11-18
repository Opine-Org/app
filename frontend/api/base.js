import reqwest from 'reqwest';

const base = {
    get: function (path) {
        return reqwest({
            method: 'get',
            url: path,
            type: 'json',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    },

    post: function (path, data) {
        return reqwest({
            method: 'post',
            url: path,
            type: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
};

export default base;
