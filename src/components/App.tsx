import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import '../app.css';

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
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/recipes">Recipes</Link></li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/recipes" component={Recipes} />
                </div>
            </Router>
        );
    }
}