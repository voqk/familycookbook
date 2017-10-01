import * as React from 'react';
import {
    Grid, Row, Col,
    Panel,
    FormGroup,ControlLabel, FormControl,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import * as firebase from 'firebase';

interface LoginProps extends RouteComponentProps<undefined> {}

interface LoginState {
    email: string;
    password: string;
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e: any) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(user =>{
            this.props.history.push("/");
        });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={10} xsPush={1} sm={6} smPush={3} md={4} mdPush={4} >
                        <h3 className="text-center">Sign in to Family Cookbook</h3>
                        <Panel>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="emailfield">
                                    <ControlLabel>Email address</ControlLabel>
                                    <FormControl
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        placeholder="Email address"
                                    />
                                </FormGroup>
                                <FormGroup controlId="passwordfield">
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
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
