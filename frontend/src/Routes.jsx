import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

class Routes extends Component{

    render(){
        return (
            <div className="App">
            
                <div className="centerContent">
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        {/*<Route path="/home" render={(props) => <Home {...props} email={this.state.email} /> } />*/}
                        <Route path="/home" component={Home} />
                    </Switch>
                </div>
            </div>

        );
    }
}

export default Routes;