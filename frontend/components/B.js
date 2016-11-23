import React from 'react';


const B = React.createClass({

    handleClick: function (e) {
        e.preventDefault();
        appHistory.push('/cart');
    },

    render: function () {
        return (
            <div>
                <h1>Component B</h1>
                <a href="#" onClick={this.handleClick}>Go to component A</a>
            </div>
        );
    }
});

export default B;
