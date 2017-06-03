import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

import { NavigationBar } from './NavigationBar';
import { Home } from './Home';
import { About } from './About';
import { Recipes } from './Recipes';

export class App extends React.Component<undefined, undefined> {
    constructor() {
        super();
    }
    render() {
        return(
            <Router>
                <div>
                    <NavigationBar 
                        header={{name: "Family cookbook", to: "/"}}
                        links={[
                            {name: "About", to: "/about"},
                            {name: "Recipes", to: "/recipes"},
                        ]} />
                    <div className="container">
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/recipes" component={Recipes} />
                    </div>
                </div>
            </Router>
        );
    }
}