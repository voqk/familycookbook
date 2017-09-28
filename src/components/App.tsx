import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

import { NavigationBar } from './NavigationBar';
import { Home } from './Home';
import { About } from './About';
import { RecipeRouter } from './recipes/RecipeRouter';

export class App extends React.Component<undefined, undefined> {
    constructor() {
        super();
    }
    render() {
        return(
            <Router>
                <div>
                    <NavigationBar 
                        header={{name: "Family cookbook", to: "/recipes"}}
                        links={[
                            {name: "Recipes", to: "/recipes"},
                            {name: "About", to: "/about"},
                        ]} />

                    <Grid>
                        <Route exact path="/"  render={() => <Redirect to="/recipes" />} />
                        <Route path="/about" component={About} />
                        <Route path="/recipes" component={RecipeRouter} />
                    </Grid>
                </div>
            </Router>
        );
    }
}