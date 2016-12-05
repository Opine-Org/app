import React from 'react';
import { Button, Checkbox, Form, Segment, Grid, Header, Message } from 'semantic-ui-react';

const Login = (props) => (
    <Segment vertical>
        <Grid centered columns={2}>
            <Grid.Column>
                <Header size="huge">Login</Header>
                <Form onSubmit={
                        (e, serializedForm) => {
                            e.preventDefault();
                            props.submitAdminLogin(serializedForm);
                        }
                    }
                    error={(props.error !== null)}
                    warning={(props.warning !== null)}
                    loading={props.isFetching}
                >
                    <Message
                        error
                        header="An Error Occurred"
                        content={props.error !== null && props.error.message || null}
                    />
                    <Message
                        warning
                        header="Please Correct These Issues"
                        list={props.warning !== null && props.warning.message || []}
                    />
                    <Form.Field error={(props.warning != null && props.warning.fields.email != null)}>
                        <label>Email</label>
                        <input name="email" placeholder="email" onChange={(e) => { props.clearAdminFieldError('email'); }} />
                    </Form.Field>
                    <Form.Field error={(props.warning != null && props.warning.fields.password != null)}>
                        <label>Password</label>
                        <input name="password" type="password" placeholder="password" onChange={(e) => { props.clearAdminFieldError('password'); }} />
                    </Form.Field>
                    <Button type="submit" disabled={props.isFetching}>Login</Button>
                </Form>
            </Grid.Column>
        </Grid>
    </Segment>
);

export default Login;
