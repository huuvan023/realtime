import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import firebase from './Services/Firebase';
import routes from './Lib/Routes'
 

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      display: true,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      }
      else {
        this.setState({
          authenticated: false,
          loading: true,
        });
      }
    })
  }
  render(){
    let display = true;
    if(window.innerWidth < 768 ){
      display = false;
    }
    return display === false ? 
    (
      <div>
        Sorry for this inconvenience, the site is in beta testing and only accepts devices above 768px.!
      </div>
    ) 
    :
    (<Router>
          <Switch>
            { routes.map((r,index) => {
              return <Route path={ r.path }
              key = { index }
              exact = { r.exact}
              component = {r.main}
              />
            }) 
          }
          </Switch>
          
      </Router>
    );
  }
}

export default App;
