import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { 
    ListGroup, ListGroupItem
} from 'react-bootstrap';

import { Recipe, RecipeInfoDto } from '../../Models';

interface RecipeListProps extends RouteComponentProps<undefined> {
    recipes: {[id: string]: RecipeInfoDto};
}

export class RecipeList extends React.Component<RecipeListProps, any> {
    constructor(props: RecipeListProps) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Recipes</h1>
                <ul> 
                    {Object.keys(this.props.recipes).map((id) => {
                        const recipe = this.props.recipes[id];
                        return (
                            <LinkContainer key={id} to={`${this.props.match.url}/${id}`}>
                                <li>
                                    <a href={`${this.props.match.url}/${id}`}>{recipe.name}</a>
                                </li>
                            </LinkContainer>
                        );
                    })}
                </ul>
            </div>
        );
    }
}