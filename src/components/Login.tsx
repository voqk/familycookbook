import * as React from 'react';
import {
    Grid, Row, Col,
    Panel,
    FormGroup,ControlLabel, FormControl,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Login extends React.Component<undefined, undefined> {
    constructor() {
        super();
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={10} xsPush={1} sm={6} smPush={3} md={4} mdPush={4} >
                        <h3 className="text-center">Sign in to Family Cookbook</h3>
                        <Panel>
                            <form>
                                <FormGroup controlId="emailfield">
                                    <ControlLabel>Email address</ControlLabel>
                                    <FormControl
                                        type="email"
                                        placeholder="Email address"
                                    />
                                </FormGroup>
                                <FormGroup controlId="passwordfield">
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                    />
                                </FormGroup>
                                <Button type="submit" bsStyle="success" block={true}>
                                    Sign in
                                </Button>
                            </form>
                        </Panel>
                        <Panel>
                            <p className="text-center">
                                New to the family cookbook? <LinkContainer className="inline" to={"/join"}><a href="/join">Create an account.</a></LinkContainer>
                            </p>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
