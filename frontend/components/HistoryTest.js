import React from 'react';

const HistoryTest = React.createClass({
    handleClick: function (e) {
        e.preventDefault();
        //window.history.pushState({}, "Test", "/test");
        appHistory.push('/home', { some: 'state' });
    },

    render: function () {
        return (
            <div>
                <a onClick={this.handleClick}>Test</a>
            </div>
        );
    }
});

export default HistoryTest;
