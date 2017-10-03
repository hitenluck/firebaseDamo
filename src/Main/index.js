import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';



class Main extends Component {

  
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="Userlst" component={Userlst} title="Userlst" initial/>
                </Scene>
            </Router>

        )

    }

}

export default Main;
