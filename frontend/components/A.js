import React from 'react';

const A = React.createClass({

    handleClick: function (e) {
        e.preventDefault();
        appHistory.push('/product');
    },

    render: function () {
        return (
            <div>
                <h1>Component A</h1>
                <a href="#" onClick={this.handleClick}>Go to component B</a>
            </div>
        );
    }
});

export default A;
