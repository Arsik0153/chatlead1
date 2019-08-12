import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.sass';
import SignUp from './pages/signUp/signUp';
import Auth from './pages/auth/auth';
import Bots from './pages/bots/bots';
import onlyAutorizenUsers from './componens/hoc/onlyAutorizedUsers';
import onlyDontRegistrationUsers from './componens/hoc/onlyNotRegistration';


class App extends React.Component {

  render() {
    return(
        <Router>
          <div>
            <Switch>
              <Route exact path={"/"} render={() => (
                  <Redirect to={'signUp'}/>
              )}/>
              <Route
                  exact
                  path={"/signUp"}
                  component={onlyDontRegistrationUsers(SignUp)}
              />
              <Route
                  exact
                  path={"/auth"}
                  component={onlyDontRegistrationUsers(Auth)}
              />
                <Route
                    exact
                    path={"/bots"}
                    component={onlyAutorizenUsers(Bots)}
                />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
