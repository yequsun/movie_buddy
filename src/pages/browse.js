import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import {Card} from 'semantic-ui-react';
import PostCard from '../components/postCard'
class Browse extends Component{
    constructor(props){
        super(props)
        this.state = {itemData: {},loaded:false}
      }

    componentDidMount(){
        
        let apiName = 'mbapi';
        let path = '/newpost';
        API.get(apiName, path).then(response => {
            console.log(response)
            let others = [];
            response.data.forEach(element => {
                if(element.user!=this.props.username && element.status == 'open'){
                    others.push(element);
                }
            });
            this.setState({
             //itemData: response.data,
             itemData:others,
             loaded: true
            });
          });
        
          /*
         let apiName = 'mbapi';
         let path = '/newpost/o';
         let params = {
             body: {
                 currentUser: this.props.username
             }
         }
         API.get(apiName, path,params).then(response => {
             console.log(response)
             this.setState({
              itemData: response.data,
              loaded: true
             });
           });
           */
    }


    render(){
            if(!this.state.loaded){
                return(
                <h3>Loading...</h3>)
                
            }else{
                return (
                    <div>
                    {this.state.itemData.map(item => (
                        <PostCard title={item.title} pid={item.pid} time={item.time} email={item.email} user={item.user} ticket={item.ticket} theater = {item.theater}/>
                    ))}
                    </div>
                )
                
            }
    }
}

export default Browse;