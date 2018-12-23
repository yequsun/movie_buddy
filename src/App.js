import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { API } from 'aws-amplify';
import aws_exports from './aws-exports';
import {Header, Icon, Container} from "semantic-ui-react"
import Navbar from "./components/navbar"
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify';
//user context
//import UserContext from "./components/userContext"

//routing
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import pages
import Home from "./pages/home";
import NewPost from "./pages/newPost";
import Inbox from "./pages/inbox";
import Profile from "./pages/profile";
Amplify.configure(aws_exports);




let apiName = 'api2068ffe3';
let path = '/items';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "initial"
    }
  }
  
  componentDidMount(){
    console.log(this);
    /*
        let apiName = 'mbapi';
        let path = '/post';
        let newItem = {
            body: {
                pid: '123',
                user: 'yequsun'
            }
        }

        API.post(apiName, path, newItem).then(response => {
            console.log(response)
            }).catch(error => {
                console.log(error.response)
            });
            */

    /*
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
    .catch(err => console.log(err));
    */
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => this.setState({
      username: user.username,
      email: user.attributes.email
    }))
    .catch(err => console.log(err));
  }



  render() {
    return (
      <Router>
      <Container>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>Movie Buddy</Header.Content>
        <p>{this.state.username}</p>
      </Header>
      <Navbar/>
      <Route exact path='/' render={(props) => <Home {...props} username={this.state.username} email={this.state.email}  />}/>
        <Route path="/newpost" render={(props) => <NewPost {...props} username={this.state.username} email={this.state.email}  />}/>
        <Route path="/inbox" render={(props) => <Inbox {...props} username={this.state.username} email={this.state.email}  />}/>
        <Route path="/profile" render={(props) => <Profile {...props} username={this.state.username} email={this.state.email}  />}/>
      </Container>
      </Router>
    );
  }
}

export default withAuthenticator(App);

