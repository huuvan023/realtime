import React, { Fragment } from 'react';
import routes from './Lib/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import firebase from './Services/Firebase';
import { toast, ToastContainer } from 'react-toastify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
    };
  }
  showToast = (type,message) => {
    switch(type) {
      case 0 :
        toast.warning(message);
      break;

      case 1 :
        toast.success(message);
      break;

      default:
      break;
    }
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
    return this.state.loading === false ? 
    (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only text-center">Loading...</span>
      </div>
    ) 
    : 
    (<Router>
      
          <ToastContainer
          autoClose = {2000}
          hideProgressBar = {true}
          position = { toast.POSITION.BOTTOM_CENTER } />
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

      </Router>
    );
  }
}

export default App;
