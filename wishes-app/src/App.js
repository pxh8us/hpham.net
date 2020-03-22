import React, {Component} from 'react';

import firebase from './Firebase';

import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import Public from './Public';
import { Router, navigate } from '@reach/router';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        console.log("found logged-in user");
        console.log(FBUser);
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      }
    });
  }

  registerUser = userName => {
    console.log("App# register user " + userName)
    firebase.auth().onAuthStateChanged(FBUser => {
      console.log("App#onAuthStateChanged");
      console.log(FBUser);
      FBUser.updateProfile({
          displayName: userName
        }).then(() => {
          console.log("App#update user state");
          this.setState({
            user: FBUser,
            displayName: FBUser.displayName,
            userID: FBUser.uid
          });
          navigate('/public');
        });
      });
  }

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userID: null
    });

    firebase.auth().signOut().then(() => {
      navigate('/login');
    });
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser}/>
        {this.state.user && 
          <Welcome userName={this.state.displayName} logOutUser={this.logOutUser}/>
        }
        
        <Router>
          <Home path="/" user={this.state.user}/>
          <Login path="/login"/>
          <Public path="/public"/>
          <Register 
            path="/register"
            registerUser={this.registerUser}
          />
        </Router>
        
      </div>
    );
  }
  
}

export default App;
