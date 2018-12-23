import React, { Component } from 'react';
import {Image} from 'semantic-ui-react';
import {Card} from 'semantic-ui-react';
const mdb = require('moviedb')('c03761f1d091cd9beaffec31bdc755c0');
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            error:null,
            isLoaded:false,
            moviesOBJs:[]
        }
    }


    componentDidMount(){
        fetch("http://data.tmsapi.com/v1.1/movies/showings?startDate=2018-12-23&zip=11201&api_key=bdw4fr379pqkxdrbe2dcq6t7")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded:true,
                moviesOBJs: result.slice(0,5),
            });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
    }


    render(){
        const { error, isLoaded, moviesOBJs } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
            <h3>Latest Release</h3>
            <Card.Group>
              {moviesOBJs.map(movie => (
                <Card key={movie.title}>
                <Card.Content>
                  <Card.Header>{movie.title}</Card.Header>
                  <Card.Description>
                  {movie.releaseDate}
                    </Card.Description>
                    </Card.Content>
                </Card>
              ))}
            </Card.Group>
            </div>
          );

          /*
          return (
            <ul>
                <h3>Latest Release</h3>
              {moviesOBJs.map(movie => (
                <li key={movie.title}>
                  {movie.title} {movie.releaseDate}
                  <Image></Image>
                </li>
              ))}
            </ul>
          );
          */
        }
      }
}

export default Home;