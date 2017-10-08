import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    InputGroup,
    HelpBlock,
    Button,
    Panel,
    Row, Col
} from 'react-bootstrap';
import * as moment from 'moment';

import { RecipePretty } from './RecipePretty';
import { Recipe, Section } from '../../Models';
import { repo } from '../../firebase/Repo';

interface RecipeFormPageProps extends RouteComponentProps<{id: string}> {
    sections: Array<string>
 }

interface RecipeFormState {
    recipe: Recipe;
    sectionFormType: "existing" | "new";
    sections: {[id: string]: Section}
}

export class RecipeFormPage extends React.Component<RecipeFormPageProps, RecipeFormState> {
    private switchSectionStateMagicString = "switch-to-new";

    constructor(props: RecipeFormPageProps) {
        super(props);
        this.state = {
            recipe: {
                name: "",
                body: "",
                section: {
                    id: "",
                    name: ""
                } as Section
            } as Recipe,
            sections: {},
            sectionFormType: "existing"
        }

        this.setSectionState = this.setSectionState.bind(this);
        this.orderSections = this.orderSections.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSectionChange = this.handleSectionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fillRecipeFormBasedOnRoute = this.fillRecipeFormBasedOnRoute.bind(this);
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        this.fillRecipeFormBasedOnRoute(recipeId);
        repo.getSections().then((sections) => { this.setState({sections: sections})})
    } 

    componentWillReceiveProps(nextProps: RecipeFormPageProps) {
        const recipeId = nextProps.match.params.id;
        this.fillRecipeFormBasedOnRoute(recipeId);
    }

    orderSections(sections: {[id: string]: Section}) {
        return Object.keys(sections).map(key => sections[key]).sort((sec1, sec2) => {
            if(sec1.name < sec2.name) { return -1 }
            if(sec1.name > sec2.name) { return 1 }
            return 0;
        });
    }

    fillRecipeFormBasedOnRoute(recipeId: string) {
        if(recipeId) {
            repo.getRecipe(recipeId).then(recipe => {
                this.setState({recipe: recipe});
            })
        } else {
            const emptyRecipe = {
                name: "",
                body: "",
                section: {
                    id: "",
                    name: ""
                } as Section,
                lastEditTimeStamp: undefined
            } as Recipe;
            this.setState({recipe: emptyRecipe});
        }
    }

    setSectionState(nextFormType: "existing" | "new") {
        const recipe = {...this.state.recipe};
        switch(nextFormType) {
            case "existing": {
                console.log(this.orderSections(this.state.sections));
                recipe.section = this.orderSections(this.state.sections)[0];
                console.log(recipe);
                break;
            }
            case "new": {
                const newSection = {
                    id: "",
                    name: ""
                } as Section;
                recipe.section = newSection;
                break;
            }
        }
        this.setState({
            recipe: recipe,
            sectionFormType: nextFormType
        });
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;
        const recipe = {...this.state.recipe} as any;
        recipe[name] = value;
        this.setState({ recipe: recipe });
    }

    handleSectionChange(event: any) {
        const recipe = {...this.state.recipe};
        switch(this.state.sectionFormType) {
            case "new": {
                const newSectionName = event.target.value;
                recipe.section.name = newSectionName;
                break;
            }
            case "existing": {
                const sectionId = event.target.value;
                recipe.section = this.state.sections[sectionId];
                break;
            }
        }
        this.setState({recipe: recipe});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const recipe = {...this.state.recipe};
        recipe.lastEditTimeStamp = moment();
        if(this.props.match.params.id) {
            repo.updateRecipe(this.props.match.params.id, recipe).then(() => {
                this.setState({recipe: recipe});
            })
        } else {
            repo.createRecipe(this.state.recipe).then((recipeId) => {
                this.setState({recipe: recipe});
                this.props.history.replace(`/recipes/edit/${recipeId}`);
            });
        }
    }

    renderSectionForm() {
        switch(this.state.sectionFormType) {
            case "existing": {
                return(
                    <InputGroup>
                        <FormControl 
                            componentClass="select"
                            name="section" 
                            onChange={this.handleSectionChange} 
                            required={true}
                            value={this.state.recipe.section.id}
                            type="text">
                            {Object.keys(this.state.sections)
                                .sort()
                                .map((key) => {
                                    const section = this.state.sections[key];
                                    return(
                                        <option key={key} value={section.id}>{section.name}</option>
                                    );
                                })}
                        </FormControl>
                        <InputGroup.Button>
                            <Button 
                                bsStyle="primary"
                                onClick={() => this.setSectionState("new")} >
                                Existing section
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
        );
            }
            case "new": {
                return(
                    <InputGroup>
                        <FormControl 
                            name="section" 
                            value={this.state.recipe.section.name} 
                            onChange={this.handleSectionChange} 
                            placeholder={"New section name"}
                            required={true}
                            type="text">
                        </FormControl>
                        <InputGroup.Button>
                            <Button
                                bsStyle="success"
                                onClick={() => this.setSectionState("existing")} >
                                New section
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                )
            }
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
        const lastSaved = this.state.recipe.lastEditTimeStamp 
                            ? this.state.recipe.lastEditTimeStamp.format('LLL') 
                            : "Never";
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
                                        value={this.state.recipe.name} 
                                        onChange={this.handleInputChange} 
                                        required={true}
                                        type="text" />
                                </FormGroup>
                                <FormGroup controlId="section">
                                    <ControlLabel>Section</ControlLabel>
                                    {this.renderSectionForm()}
                                </FormGroup>
                                <FormGroup controlId="body">
                                    <ControlLabel>Body</ControlLabel>
                                    <FormControl style={{height: "400px"}}
                                        name="body" 
                                        value={this.state.recipe.body} 
                                        onChange={this.handleInputChange} 
                                        required={true}
                                        componentClass="textarea" />
                                </FormGroup>
                                <Button type="submit">Save</Button>
                                <div 
                                    className="pull-right"
                                    style={{paddingTop: "10px"}}>
                                    {this.renderLastSaved(this.state.recipe.lastEditTimeStamp)}
                                </div>
                            </form>
                        </Panel>
                    </Col>
                    <Col xs={12} md={6}>
                        <Panel header="Preview">
                            <RecipePretty recipe={this.state.recipe} />
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}