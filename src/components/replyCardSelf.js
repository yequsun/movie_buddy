import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Amplify, { API } from 'aws-amplify';
const uuidv1 = require('uuid/v1');
class ReplyCardSelf extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //props: puser, pemail, remail, ruser, rid, pid, status, ticket, time, title
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
            //update database
            //yes: post.status = closed, reply.status = accepted, delete all other replies status = pending
            //no: delete reply - don't use no button

            //user answers yes, first call: update post status
            let apiName = 'mbapi';
            let path = '/newpost';
            let editPost = {
                body: {
                    pid: this.props.pid,
                    user: currentUser,
                    email: userEmail,
                    title: this.props.title,
                    theater: this.props.theatreName,
                    time: this.props.time,
                    status: "closed",
                    ticket: this.props.ticket
                }
            }
            console.log(editPost);
            
            API.put(apiName, path, editPost).then(response => {
                console.log(response);
                //alert("You have accepted this reply, your post is now closed. Enjoy the movie!");
                }).catch(error => {
                    console.log(error.response);
            });

            //now change the reply status to accepted
            path = '/reply';
            let editReply = {
                body: {
                    rid: this.props.rid,
                    pid: this.props.pid,
                    puser: currentUser,
                    pemail: userEmail,
                    ruser:this.props.ruser,
                    remail:this.props.remail,
                    title: this.props.title,
                    theater: this.props.theater,
                    time: this.props.dateTime,
                    status: "accepted",
                    ticket: this.props.ticket
                }
            };
            API.put(apiName, path, editReply).then(response => {
                console.log(response);
                //alert("You have accepted this reply, your post is now closed. Enjoy the movie!");
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
                                <h5 className='card-title'>From: {this.props.ruser}</h5>
                                <p className='card-text'>{this.props.remail}</p>
                                <h5 className='card-title'>To: {this.props.puser}</h5>
                                <p className='card-text'>{this.props.pemail}</p>
                                <h5 className='card-title'>Movie: {this.props.title}</h5>
                                <h5 className='card-title'>At: {this.props.theater}</h5>
                                <p className='card-text'>{this.props.time}</p>
                                <a href={this.props.ticket} className="badge badge-warning">Ticket</a>
                                <h5 className='card-title'>Status: {this.props.status}</h5>
                            </div>
                        </div>
                    </form>
        )           
    }
}

export default ReplyCardSelf;