import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
    Grid, Row, Col,
    Panel,
    FormGroup,ControlLabel, FormControl,
    Button
} from 'react-bootstrap';

import { auth } from '../firebase/Auth';
import { User } from '../Models';

class JoinState {
    public email: string = "";
    public password: string = ""
}

export class Join extends React.Component<RouteComponentProps<undefined>, JoinState> {
    constructor(props: RouteComponentProps<undefined>) {
        super(props);
        this.state = new JoinState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const credentials = {...this.state};
        auth.createUser(credentials.email, credentials.password)
        .then(user => {
            this.props.history.push("/recipes");
        })
        .catch(err => {
            console.log(err.message);  
        });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={10} xsPush={1} sm={6} smPush={3} md={4} mdPush={4} >
                        <h3 className="text-center">Join the Family Cookbook</h3>
                        <Panel>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="emailfield">
                                    <ControlLabel>Email address</ControlLabel>
                                    <FormControl
                                        name="email"
                                        type="email"
                                        placeholder="Email address"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
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
                                    Join
                                </Button>
                            </form>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

