import React, { Component, PropTypes } from 'react';

import HistoryTest from './HistoryTest.js';

const Path = React.createClass({
    render: function () {
        return (
            <div>
                <div>Path: {this.props.bold ? <strong>{this.props.value}</strong> : this.props.value}</div>
                <div><button onClick={this.props.togglePathBold}>Toggle</button></div>
                <HistoryTest />
            </div>
        );
    }
});

Path.propTypes = {
    bold: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string.isRequired,
    togglePathBold: React.PropTypes.func.isRequired
};

export default Path;
