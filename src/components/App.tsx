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
import { Login } from './Login';
import { Join } from './Join';
import { RecipeRouter } from './recipes/RecipeRouter';

import * as firebase from 'firebase';

interface AppState {
    user: firebase.User;
}

export class App extends React.Component<undefined, AppState> {
    constructor() {
        super();

        this.state = {
            user: null
        };

        firebase.auth().onAuthStateChanged(user => {
            this.setState({user: user});
        });
    }

    onSignOut() {
        firebase.auth().signOut();
    }

    render() {
        return(
            <Router>
                <div>
                    <NavigationBar 
                        user={this.state.user}
                        logout={this.onSignOut}
                        header={{name: "Family cookbook", to: "/recipes"}}
                        links={[
                            {name: "Recipes", to: "/recipes"},
                            {name: "About", to: "/about"},
                        ]} />

                    <Grid>
                        <Route exact path="/"  render={() => <Redirect to="/recipes" />} />
                        <Route path="/about" component={About} />
                        <Route path="/recipes" component={RecipeRouter} />
                        <Route path="/login" component={Login} />
                        <Route path="/join" component={Join} />
                    </Grid>
                </div>
            </Router>
        );
    }
}