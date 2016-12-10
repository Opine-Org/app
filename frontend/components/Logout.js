import React from 'react';

class Logout extends React.Component {
    componentDidMount() {
        // remove values from local storage
        window.localStorage.removeItem('token');

        // redirect user home
        appHistory.push('/');
    }

    render() {
        return null;
    }
}

export default Logout;
