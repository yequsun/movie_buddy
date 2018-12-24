import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Amplify, { API } from 'aws-amplify';
const uuidv1 = require('uuid/v1');

// props to get from parent: item.pid, item.user, item.email, item.ticket, item.theater, item.time, item.title
class PostCard extends Component{
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
            let path = '/reply';
            let newItem = {
                body: {
                    rid: uuidv1(),
                    pid:this.props.pid,
                    ruser:currentUser,
                    remail:userEmail,
                    status: 'pending',
                    puser:this.props.user,
                    pemail:this.props.email,
                    ticket: this.props.ticket,
                    time: this.props.time,
                    title:this.props.title,
                    theater: this.props.theater

                }
            }
            console.log(newItem);
            
            API.post(apiName, path, newItem).then(response => {
                console.log(response);
                alert("Success! Now wait for them to approve your answer!");
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
                                <h5 className='card-title'>{this.props.title}</h5>
                                <p className='card-text'>{this.props.theater}</p>
                                <p className='card-text'>{this.props.time}</p>
                                <h5 className='card-title'>{this.props.user}</h5>
                                <p className='card-text'>{this.props.email}</p>
                                <a href={this.props.ticket} className="badge badge-warning">Ticket</a>
                                <button className="btn btn-primary" type="submit">Watch it with him/her!</button>
                            </div>
                        </div>
                    </form>
        )           
    }
}

export default PostCard;