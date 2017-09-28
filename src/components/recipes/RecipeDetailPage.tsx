import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import repo from '../../Repo';
import { RecipeDto, RecipeInfoDto, Recipe } from '../../Models';
import { RecipePretty } from './RecipePretty';

interface RecipeDetailPageRouteProps {
    id: string;
}

interface RecipeDetailPageProps extends RouteComponentProps<RecipeDetailPageRouteProps> {}

export class RecipeDetailPage extends React.Component<RecipeDetailPageProps, Recipe> {
    constructor(props: RecipeDetailPageProps) {
        super(props);
        this.state = {
            name: "",
            body: ""
        } as Recipe;
    }

    componentDidMount() {
        repo.getRecipe(this.props.match.params.id).then(recipe => {
            this.setState(recipe);
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <RecipePretty recipe={this.state} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LinkContainer to={`/recipes/edit/${this.props.match.params.id}`}><Button bsStyle="link">Edit</Button></LinkContainer>
                        <LinkContainer to={`/recipes`}><Button bsStyle="link" onClick={() => repo.deleteRecipe(this.props.match.params.id)} >Delete</Button></LinkContainer>
                    </Col>
                </Row>
            </div>
        );
    }
}