import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Amplify, { API } from 'aws-amplify';
const uuidv1 = require('uuid/v1');
class ShowtimeForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props);

        var currentUser;
        var userEmail;

        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            currentUser = user.username;
            userEmail = user.attributes.email;
            console.log(currentUser);
            console.log(userEmail);

            let apiName = 'mbapi';
            let path = '/newpost';
            let newItem = {
                body: {
                    pid: uuidv1(),
                    user: currentUser,
                    email: userEmail,
                    title: this.props.title,
                    theater: this.props.theatreName,
                    time: this.props.dateTime,
                    status: "open",
                    ticket: this.props.ticket
                }
            }
            console.log(newItem);
            
            API.post(apiName, path, newItem).then(response => {
                console.log(response);
                alert("Posted! Now wait for someone to answer your call!");
                }).catch(error => {
                    console.log(error.response);
                });
        })
        .catch(err => console.log(err));
      }

    render(){
        return(
                    <form onSubmit={this.handleSubmit}>
                        <div className = 'card'>
                            <div className='card-body'>
                                <h5 className='card-title'>{this.props.theatreName}</h5>
                                <p className='card-text'>{this.props.dateTime}</p>
                                <a href={this.props.ticket} className="badge badge-warning">Ticket</a>
                                <button className="btn btn-primary" type="submit">Look for a Buddy</button>
                            </div>
                        </div>
                    </form>
        )           
    }
}

export default ShowtimeForm;