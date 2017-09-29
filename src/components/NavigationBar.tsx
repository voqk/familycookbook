import * as React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface NavigationBarLink {
    name: string;
    to: string;
}

interface NavigationBarProps {
    header: NavigationBarLink;
    links: Array<NavigationBarLink>;
}

export const NavigationBar = (props: NavigationBarProps) => {
    return(
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <LinkContainer to={props.header.to}>
                        <a href={props.header.to}>{props.header.name}</a>
                    </LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    {props.links.map((link, i) => <LinkContainer key={i} to={link.to}>
                                                    <NavItem eventKey={i} href={link.to}>
                                                        {link.name}
                                                    </NavItem>
                                                  </LinkContainer>)}
                </Nav>
                <Nav pullRight>
                    <LinkContainer key={1} to={"/login"}>
                        <NavItem eventKey={1} href={"/login"}>
                            Sign in
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}