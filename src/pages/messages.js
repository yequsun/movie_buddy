import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import PostCardSelf from '../components/postCardSelf'
import ReplyCard from '../components/replyCard'
import ReplyCardSelf from '../components/replyCardSelf';

class Messages extends Component{
    constructor(props){
        super(props)
        this.state = {loaded:false, posts:[],replies:[], repliesSelf:[]}
      }

    componentDidMount(){
        //get all post posted by user
        let apiName = 'mbapi';
        let path = '/newpost';
        API.get(apiName, path).then(response => {
            console.log('1');
            console.log(response)
            let postsSelf = [];
            response.data.forEach(element => {
                if(element.user==this.props.username){
                    
                    postsSelf.push(element);
                }
            });
            this.setState({
             posts:postsSelf
            });
          });
          //get all replies send to this user
          path = '/reply'
          API.get(apiName, path).then(response => {
            console.log('2');
            console.log(response)
            let repliesRec = [];
            response.data.forEach(element => {
                if(element.puser==this.props.username){
                    repliesRec.push(element);
                }
            });
            this.setState({
             replies:repliesRec,
            });
          });

          //get all the replies posted by this user
          API.get(apiName, path).then(response => {
            console.log('2');
            console.log(response)
            let repliesPosted = [];
            response.data.forEach(element => {
                if(element.ruser==this.props.username){
                    repliesPosted.push(element);
                }
            });
            this.setState({
             repliesSelf:repliesPosted,
             loaded: true
            });
          });

    }


    render(){
            if(!this.state.loaded){
                return(
                <h3>Loading...</h3>)
                
            }else{
                return (
                    <div>
                    <h3>Your Posts</h3>
                    <div className='row'>
                        {this.state.posts.map(item => (
                            <PostCardSelf title={item.title} pid={item.pid} time={item.time} email={item.email} user={item.user} ticket={item.ticket} status={item.status} theater={item.theater}/>
                        ))}
                    </div>
                    <h3>Replies Received</h3>
                    <div className='row'>
                        {this.state.replies.map(item => (
                                <ReplyCard title={item.title} pid={item.pid} rid={item.rid} time={item.time} pemail={item.pemail} puser={item.puser} remail={item.remail} ruser={item.ruser} ticket={item.ticket} status={item.status} theater={item.theater}/>
                            ))}
                    </div>
                    <h3>Replies Posted</h3>
                    <div className='row'>
                        {this.state.repliesSelf.map(item => (
                                <ReplyCardSelf title={item.title} pid={item.pid} rid={item.rid} time={item.time} pemail={item.pemail} puser={item.puser} remail={item.remail} ruser={item.ruser} ticket={item.ticket} status={item.status} theater={item.theater}/>
                            ))}
                    </div>
                    </div>
                )
                
            }
    }
}

export default Messages;