import React, { Component } from 'react';
import {Image, Divider} from 'semantic-ui-react';
import {Card} from 'semantic-ui-react';
import {API} from 'aws-amplify';
import MovieInfoCard from '../components/movieInfoCard'

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
        //////////
        //////////


      let apiName = 'mbapi';
      let path = '/home/nowPlaying'; 
      let myInit = {};
      API.get(apiName, path, myInit).then(response => {
          console.log(response);
          // Add your code here
          this.setState({
              moviesOBJs : response,
              isLoaded:true
          });
      }).catch(error => {
          console.log(error.response)
      });

      path = '/reply/Object/bd588af0-0777-11e9-8e27-0794e58ea3fd';

      API.del(apiName, path).then(response => {
        console.log(response)
        }).catch(error => {
            console.log(error.response)
        });


    }


    render(){
        if(!this.state.isLoaded){
            return(
                <div><h3>Loading...</h3></div>
            );
        }else{
            let backdrop_index = Math.floor(Math.random()*5);
            let backdrop_url = "https://image.tmdb.org/t/p/w780"+this.state.moviesOBJs[backdrop_index].backdrop;
            let backdrop_css = {
                backgroundImage : 'url('+backdrop_url+')'
            };
            console.log(backdrop_url);
            return(
                <div className='container'>
                    <h3>Now Playing</h3>
                    <div className='row'>
                    {this.state.moviesOBJs.map(movie => (
                        <MovieInfoCard key = {movie.title} title={movie.title} date={movie.date} poster={movie.poster}/>
                    ))}
                    </div>
                </div>
            );
        }
    }
}

export default Home;