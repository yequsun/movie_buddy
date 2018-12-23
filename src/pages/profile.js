import React, { Component } from 'react';
import { propStyle } from 'aws-amplify-react/dist/AmplifyUI';
import { Auth } from 'aws-amplify';

class Profile extends Component{
    
    handleSignOut = this.handleSignOut.bind(this);
    

    handleSignOut(){
        Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
            <h3>Profile</h3>
            <h4>Username: {this.props.username}</h4>
            <h4>Email: {this.props.email}</h4>
            <a href="#" onClick={this.handleSignOut}>
                Sign Out
            </a>
            </div>
        );
    }
}

export default Profile;