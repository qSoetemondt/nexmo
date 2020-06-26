import React from 'react';
import User from './components/User';
import Conversation from './components/Conversation';
 
import nexmoClient from 'nexmo-client';
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
 
    this.login = this.login.bind(this);
    this.getJWT = this.getJWT.bind(this);
    this.userUpdated = this.userUpdated.bind(this);
  }
 
  login() {
    let nexmo = new nexmoClient();
    nexmo.login(this.state.token).then(app => {
      this.setState({
        app: app
      });
    });
  }
  getJWT(username) {
    fetch('/getJWT', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: username})
    })
    .then(results => results.json())
    .then(data => {
      this.setState({
        token: data.jwt
      });
      this.login();
    });
  }
  userUpdated(user) {
    if (user.username) {
      this.getJWT(user.username);
    }
  }
  render() {
    return (
      <div className="nexmo">
        <User onUpdate={this.userUpdated} />
        <Conversation app={this.state.app} loggedIn={!!this.state.token} />
      </div>
    );
  }
 
};
 
export default App;


