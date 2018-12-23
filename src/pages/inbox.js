import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import {Card} from 'semantic-ui-react';

class Inbox extends Component{
    constructor(props){
        super(props)
        this.state = {itemData: {},loaded:false}
      }

    componentDidMount(){
        let apiName = 'mbapi';
        let path = '/newpost';
        API.get(apiName, path).then(response => {
            console.log(response)
            this.setState({
             itemData: response.data,
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
            <Card.Group>
              {this.state.itemData.map(item => (
                
                <Card key={item.pid}>
                    <Card.Content>
                        <Card.Header>{item.user}</Card.Header>
                        <Card.Description>
                        {item.title}
                        </Card.Description>
                        <Card.Description>
                        {item.theater}
                        </Card.Description>
                        <Card.Description>
                        {item.time}
                        </Card.Description>
                        <Card.Description>
                        {item.email}
                        </Card.Description>
                    </Card.Content>
                </Card>
              ))}
            </Card.Group>)

            /*
                 return (
                    <ul>
                <h3>Browse Posts</h3>
              {this.state.itemData.map(item => (
                <li key={item.pid}>
                  <h3>{item.user}</h3> <h4>{item.title}</h4><h4>{item.theater}</h4><h4>{item.time}</h4><h4>{item.email}</h4>
                </li>
              ))}
            </ul>)
            */
                
            }
    }
}

export default Inbox;