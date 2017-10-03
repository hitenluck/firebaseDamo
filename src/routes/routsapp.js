import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';

import Login from './Login'

class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="Login" component={Login} title="Login" initial/>
                </Scene>
            </Router>

        )

    }

}

export default Routes;
