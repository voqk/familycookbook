import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
   Route,
   RouteComponentProps,
   Switch
} from 'react-router-dom';
import {
    Row, Col,
    Nav, NavItem,
    Button
} from 'react-bootstrap';

import { RecipeIndexPage } from './RecipeIndexPage';
import { RecipeDetailPage } from './RecipeDetailPage';
import { RecipeFormPage } from './RecipeFormPage';
import { RecipePretty } from './RecipePretty';
import { RecipeList } from './RecipeList';

export class RecipeRouter extends React.Component<RouteComponentProps<undefined>, undefined> {

    // The URL of this component
    private url : string;

    constructor(props: RouteComponentProps<undefined>) {
        super(props)
        this.url = props.match.url;
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <LinkContainer exact to={`${this.url}`}><Button bsStyle="link">Index</Button></LinkContainer>
                        <LinkContainer exact to={`${this.url}/new`}><Button bsStyle="link">New</Button></LinkContainer>
                    </Col>
                </Row>
                <Switch>
                    <Route exact path={`${this.url}`} component={RecipeIndexPage} />
                    <Route path={`${this.url}/new`} component={RecipeFormPage} />
                    <Route exact path={`${this.url}/:id`} component={RecipeDetailPage} />
                    <Route exact path={`${this.url}/edit/:id`} component={RecipeFormPage} />
                </Switch>
            </div>
        );
    }
}