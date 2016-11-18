import React from 'react';

const AdminRegister = React.createClass({
    handleFormSubmit: function (e) {
        e.preventDefault();

        // read data
        const data = {
            first_name: this.refs.first_name.value,
            last_name: this.refs.last_name.value,
            email: this.refs.email.value,
            password: this.refs.password.value
        };

        // call the action
        this.props.submitAdminRegister(data);
    },

    render: function () {

        var formClass = 'ui form';
        if (this.props.isFetching) {
            formClass += ' loading';
        }

        var errorNode;
        if (this.props.error != null) {
            errorNode = (
                <div className="ui warning message">
                    <div className="header">{this.props.error}</div>
                </div>
            );
        }

        return (

            <div className="ui sizer vertical segment">

                <div className="ui two column centered grid">
                    <div className="column">

                        <div className="ui huge header">Register</div>

                        {errorNode}

                        <form className={formClass} onSubmit={this.handleFormSubmit}>
                            <div className="field">
                                <label>First Name</label>
                                <input type="text" ref="first_name" placeholder="First Name" />
                            </div>
                            <div className="field">
                                <label>Last Name</label>
                                <input type="text" ref="last_name" placeholder="Last Name" />
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input type="text" ref="email" placeholder="Email" />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="password" ref="password" placeholder="Password" />
                            </div>
                            <div className="field">
                                <label>Password (again)</label>
                                <input type="password" ref="password2" placeholder="Confirm Password" />
                            </div>
                            <button className="ui blue button" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

export default AdminRegister;
