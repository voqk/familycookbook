import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Panel,
    Row, Col
} from 'react-bootstrap';
import * as moment from 'moment';

import { RecipePretty } from './RecipePretty';
import { Recipe } from '../../Models';
import { repo } from '../../firebase/Repo';

interface RecipeFormPageRouteProps {
    id: string
}

interface RecipeFormPageProps extends RouteComponentProps<RecipeFormPageRouteProps> { }

interface RecipeFormState {
    instructions: string
}

export class RecipeFormPage extends React.Component<RecipeFormPageProps, Recipe> {
    constructor(props: RecipeFormPageProps) {
        super(props);
        this.state = {
            name: "",
            body: "",
        } as Recipe;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fillRecipeFormBasedOnRoute = this.fillRecipeFormBasedOnRoute.bind(this);
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        this.fillRecipeFormBasedOnRoute(recipeId);
    } 

    componentWillReceiveProps(nextProps: RecipeFormPageProps) {
        const recipeId = nextProps.match.params.id;
        this.fillRecipeFormBasedOnRoute(recipeId);
    }

    fillRecipeFormBasedOnRoute(recipeId: string) {
        if(recipeId) {
            repo.getRecipe(recipeId).then(recipe => {
                this.setState(recipe);
            })
        } else {
            const emptyRecipe = {
                name: "",
                body: "",
                lastEditTimeStamp: undefined
            } as Recipe;
            this.setState(emptyRecipe);
        }
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
        const recipe = {...this.state};
        recipe.lastEditTimeStamp = moment();
        if(this.props.match.params.id) {
            repo.updateRecipe(this.props.match.params.id, recipe).then(() => {
                this.setState(recipe);
            })
        } else {
            repo.createRecipe(this.state).then((recipeId) => {
                this.setState(recipe);
                this.props.history.replace(`/recipes/edit/${recipeId}`);
            });
        }
    }

    renderLastSaved(timestamp: moment.Moment) {
        if(timestamp) {
            return <div>Last Saved: {timestamp.format('LLL')}</div>
        } else {
            return <div className="text-danger">Last Saved: Never</div>
        }
    }

    render() {
        const lastSaved = this.state.lastEditTimeStamp ? this.state.lastEditTimeStamp.format('LLL') : "Never";
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h1>{this.props.match.params.id ? "Edit" : "Add new"} recipe</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Panel>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="name">
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl 
                                        name="name" 
                                        placeholder="Name of the recipe"
                                        value={this.state.name} 
                                        onChange={this.handleInputChange} 
                                        required={true}
                                        type="text" />
                                </FormGroup>
                                <FormGroup controlId="body">
                                    <ControlLabel>Body</ControlLabel>
                                    <FormControl style={{height: "400px"}}
                                        name="body" 
                                        value={this.state.body} 
                                        onChange={this.handleInputChange} 
                                        required={true}
                                        componentClass="textarea" />
                                </FormGroup>
                                <Button type="submit">Save</Button>
                                <div 
                                    className="pull-right"
                                    style={{paddingTop: "10px"}}>
                                    {this.renderLastSaved(this.state.lastEditTimeStamp)}
                                </div>
                            </form>
                        </Panel>
                    </Col>
                    <Col xs={12} md={6}>
                        <Panel header="Preview">
                            <RecipePretty recipe={this.state} />
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}