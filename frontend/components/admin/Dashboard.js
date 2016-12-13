import React from 'react';
import { Menu, Container, Icon, Header, Card, Divider } from 'semantic-ui-react';

//ui fixed inverted menu
const Dashboard = (props) => {

    const handleLogout = (e) => {
        e.preventDefault();
        appHistory.push('/logout');
    };

    const handleProfile = (e) => {
        e.preventDefault();
        console.log('View Profile');
    };

    const handleCardClick = (e, widget) => {
        e.preventDefault();
        appHistory.push(widget.link);
    };

    return (
        <div>
            <Menu inverted attached>
                <Container>
                    <Menu.Item name="header" header>Manager</Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item name="user" onClick={handleProfile}>
                            <Icon name="user" />Test User
                        </Menu.Item>
                        <Menu.Item name="logout" onClick={handleLogout}>Logout</Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
            <Container className="main">
                <Header as='h2'>Dashboard</Header>
                {Object.keys(props.widgets).map((type, offset) => {
                    return (
                        <div key={'widgettype' + offset}>
                            <Header as='h3'>{type}</Header>
                            <Card.Group>
                                {props.widgets[type].map((widget) => {
                                    return (
                                        <Card
                                            key={'widget' + widget.id}
                                            onClick={function (e) { handleCardClick(e, widget); }}
                                        >
                                            <Card.Content header={widget.name} />
                                            <Card.Content description={widget.description} />
                                            <Card.Content extra>
                                                <Icon name={widget.icon} />
                                                {widget.call_to_action}
                                            </Card.Content>
                                        </Card>
                                    );
                                })}
                            </Card.Group>
                            <Divider />
                        </div>
                    );
                })}
            </Container>
        </div>
    );
}

export default Dashboard;
