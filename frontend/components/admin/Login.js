import React from 'react';
import { Button, Form, Segment, Grid, Header, Message } from 'semantic-ui-react';

const Login = (props) => {

    // event handlers
    const handleSubmit = (e, component) => {
        e.preventDefault();
        props.submitAdminLogin(component.formData);
    };

    return (
        <Segment vertical>
            <Grid centered columns={2}>
                <Grid.Column>
                    <Header size="huge">Login</Header>
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
                        <Form.Field error={(props.notice != null && props.notice.fields && props.notice.fields.email != null)}>
                            <label>Email</label>
                            <input name="email" placeholder="email" onChange={(e) => { props.clearAdminFieldError('email'); }} />
                        </Form.Field>
                        <Form.Field error={(props.notice != null && props.notice.fields && props.notice.fields.password != null)}>
                            <label>Password</label>
                            <input name="password" type="password" placeholder="password" onChange={(e) => { props.clearAdminFieldError('password'); }} />
                        </Form.Field>
                        <Button color="blue" type="submit" disabled={props.isFetching}>Login</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </Segment>
    )
};

Login.propTypes = {
    submitAdminLogin: React.PropTypes.func.isRequired,
    error: React.PropTypes.object,
    notice: React.PropTypes.object,
    isFetching: React.PropTypes.bool
};

export default Login;
