import React from 'react';
import { Menu, Container, Icon, Header, Card } from 'semantic-ui-react';

//ui fixed inverted menu
const Dashboard = (props) => {

    console.log(props);

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
        console.log(widget)
    };

    const cardItems = props.widgets.map((widget) => {
        return (
            <Card
                key={'widget' + widget.id}
                onClick={function (e) { handleCardClick(e, widget); }}
            >
                <Card.Content header={widget.name} />
                <Card.Content description={widget.name} />
                <Card.Content extra>
                    <Icon name={widget.icon} />
                    Call to action
                </Card.Content>
            </Card>
        );
    });

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
            <Container text className="main">
                <Header as='h2'>Dashboard</Header>
                <Card.Group>
                    {cardItems}
                </Card.Group>
            </Container>
        </div>
    );
}

export default Dashboard;
