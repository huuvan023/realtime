import React from 'react';
import routes from './Lib/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div>
          <Switch>
            { routes.map((route, index) => {
              return <Route
                      key = { index }
                      path = { route.path }
                      exact = { route.exact }
                      component = { route.main } 
                      />
            }) }
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
