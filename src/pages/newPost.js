import React, { Component } from 'react';
import {Button, Form, Card} from 'semantic-ui-react';
import ShowtimeCard from '../components/showtimeCard'

class NewPost extends Component{

    constructor(props) {
        super(props);
        this.state = {zipcode:"", date:"", moviesOBJs:[], submitted:false, datetime:"", title:"", theater:"",ticketurl:""};
    
        this.handleZipChange = this.handleZipChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTheaterChange = this.handleTheaterChange.bind(this);
    }


    handleZipChange(event) {
        this.setState({zipcode: event.target.value});
    }

    handleDateChange(event) {
        this.setState({date: event.target.value});
    }

    handleDatetimeChange(event) {
        this.setState({datetime: event.target.value});
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleTheaterChange(event) {
        this.setState({theater: event.target.value});
    }
    
    handlePost(event) {
        //this.setState({movietitle: event.target.movietitle, movietime: event.target.movietime, ticketurl: event.target.ticketurl, 
        //theater: event.target.theater});
        //var theater = event.target.getAtrribute('theater');
        event.preventDefault();
        //alert(this.state.theater);
    }


    handleSubmit(event) {
        alert('A zip was submitted: ' + this.state.zipcode);
        alert('A date was submitted: ' + this.state.date);
        event.preventDefault();
        let url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + this.state.date + '&zip=' + this.state.zipcode + '&api_key=vf6pnxs32v5y6ndh7pt6zskz';
        //let url = 'https://jsonplaceholder.typicode.com/posts';
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                submitted:true,
                //moviesOBJs: result.slice(0,5)
                moviesOBJs:result
            });
            //alert(this.state.moviesOBJs[0].title);


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

        if(!this.state.submitted){
            return(
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Zip Code</label>
                            <input placeholder="11201" value={this.state.zipcode} onChange={this.handleZipChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Date</label>
                            <input placeholder="2018-12-23" value={this.state.date} onChange={this.handleDateChange}/>
                        </Form.Field>
                        <Button type='submit'>Search</Button>
                    </Form>
                </div>
            );
        }else{
            return(
                <div>
                    <div>
                        {this.state.moviesOBJs.map(movie => (
                            <ShowtimeCard title={movie.title} showtimes={movie.showtimes}/>
                        ))}
                    </div>
                    <div>
                        <Form onSubmit={this.handlePost}>
                            <Form.Field>
                                <label>Movie Title</label>
                                <input placeholder="Jurrasic Park" value={this.state.movietitle} onChange={this.handleTitleChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Theater</label>
                                <input placeholder="UA Court Street 12 & RPX" value={this.state.theater} onChange={this.handleTheaterChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Datetime</label>
                                <input placeholder="2018-12-22T18:20" value={this.state.datetime} onChange={this.handleDatetimeChange}/>
                            </Form.Field>
                            <Button type='submit'>Post</Button>
                        </Form>
                    </div>
            </div>

            );
        }
    }
}

export default NewPost;