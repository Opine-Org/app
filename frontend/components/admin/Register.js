import React from 'react';
import { Button, Form, Segment, Grid, Header, Message } from 'semantic-ui-react';

const Register = (props) => {

    const handleSubmit = (e, component) => {
        e.preventDefault();
        props.submitAdminRegister(component.formData);
    };

    return (
        <Segment vertical>
            <Grid centered columns={2}>
                <Grid.Column>
                    <Header size="huge">Register</Header>
                    <Form
                        onSubmit={handleSubmit}
                        error={Boolean(props.error)}
                        warning={Boolean(props.notice)}
                        loading={props.isFetching}
                    >
                        <Message
                            error
                            header="An Error Occurred"
                            content={props.error != null && props.error.message || null}
                        />
                        <Message
                            warning
                            header="Please Correct These Issues"
                            list={props.notice != null && props.notice.messages || []}
                        />
                        <Form.Field error={(props.notice != null && props.notice.fields && props.notice.fields.first_name != null)}>
                            <label>First Name</label>
                            <input name="first_name" placeholder="first name" onChange={(e) => { props.clearAdminFieldError('first_name'); }} />
                        </Form.Field>
                        <Form.Field error={(props.notice != null && props.notice.fields && props.notice.fields.last_name != null)}>
                            <label>Last Name</label>
                            <input name="last_name" placeholder="last name" onChange={(e) => { props.clearAdminFieldError('last_name'); }} />
                        </Form.Field>
                        <Form.Field error={(props.notice != null && props.notice.fields && props.notice.fields.email != null)}>
                            <label>Email</label>
                            <input name="email" placeholder="email" onChange={(e) => { props.clearAdminFieldError('email'); }} />
                        </Form.Field>
                        <Form.Field error={(props.notice != null && props.notice.fields && props.notice.fields.password != null)}>
                            <label>Password</label>
                            <input type="password" name="password" placeholder="password" onChange={(e) => { props.clearAdminFieldError('password'); }} />
                        </Form.Field>
                        <Form.Field error={(props.notice != null && props.notice.fields && props.notice.fields.password2 != null)}>
                            <label>Password (again)</label>
                            <input type="password" name="password2" placeholder="re-type password" onChange={(e) => { props.clearAdminFieldError('password2'); }} />
                        </Form.Field>
                        <Button color="blue" type="submit" disabled={props.isFetching}>Login</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

Register.propTypes = {
    submitAdminLogin: React.PropTypes.func.isRequired,
    error: React.PropTypes.object,
    notice: React.PropTypes.object,
    isFetching: React.PropTypes.bool
};

export default Register;
