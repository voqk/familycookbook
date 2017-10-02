import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { RecipeList } from './RecipeList';
import { RecipeInfoDto } from '../../Models';
import { repo } from '../../firebase/Repo';

export class RecipeIndexPage extends React.Component<RouteComponentProps<undefined>, {[id: string]: RecipeInfoDto}> {
    constructor(props: RouteComponentProps<undefined>) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        repo.getIndex().then(index => {
            this.setState(index);
        })
    }

    componentWillReceiveProps() {
        repo.getIndex().then(index => {
            this.setState(index);
        })
    }

    render() {
        return(
            <Row>
                <Col sm={12} md={6}>
                    <h1>Index</h1>
                    <RecipeList recipes={this.state} {...this.props} />
                </Col>
            </Row>
        );
    }
}