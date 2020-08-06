import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import firebase from './Services/Firebase';
import { toast, ToastContainer } from 'react-toastify';
import routes from './Lib/Routes'
 

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
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
  render(){
    return false ? 
    (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only text-center">Loading...</span>
      </div>
    ) 
    :
    (<Router>
         
          
              <ToastContainer
              autoClose = {1000}
              hideProgressBar = {true}
              position = { toast.POSITION.BOTTOM_CENTER } />
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
