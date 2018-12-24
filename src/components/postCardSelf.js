import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Amplify, { API } from 'aws-amplify';
const uuidv1 = require('uuid/v1');

// props to get from parent: item.pid, item.user, item.email, item.ticket, item.theater, item.time, item.title
class PostCardSelf extends Component{
    constructor(props){
        super(props);
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
                                <h5 className='card-title'>{this.props.status}</h5>
                            </div>
                        </div>
                    </form>
        )           
    }
}

export default PostCardSelf;