import * as React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as firebase from 'firebase';

interface NavigationBarLink {
    name: string;
    to: string;
}

interface NavigationBarProps {
    header: NavigationBarLink;
    links: Array<NavigationBarLink>;
    user?: firebase.User;
    logout: () => void;
}



export class NavigationBar extends React.Component<NavigationBarProps, undefined> {
    constructor(props: NavigationBarProps) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.renderUserSection = this.renderUserSection.bind(this);
    }

    handleLogout(e: any) {
        e.preventDefault();
        this.props.logout();
    }

    renderUserSection(user: firebase.User) {
        if(user) {
            return (
                <LinkContainer key={1} to={"/logout"}>
                    <NavItem eventKey={1} href={"/login"} onClick={this.handleLogout}>
                        Sign out
                    </NavItem>
                </LinkContainer>
            );
        } else {
            return (
                <LinkContainer key={1} to={"/login"}>
                    <NavItem eventKey={1} href={"/login"}>
                        Sign in
                    </NavItem>
                </LinkContainer>
            );
        }
    }

    render() {
        return(
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to={this.props.header.to}>
                            <a href={this.props.header.to}>{this.props.header.name}</a>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {this.props.links.map((link, i) => <LinkContainer key={i} to={link.to}>
                                                        <NavItem eventKey={i} href={link.to}>
                                                            {link.name}
                                                        </NavItem>
                                                    </LinkContainer>)}
                    </Nav>
                    <Nav pullRight>
                        {this.renderUserSection(this.props.user)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}