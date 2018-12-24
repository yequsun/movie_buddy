import React, { Component } from 'react';

class MovieInfoCard extends Component{

    render(){
        return(
            <div className='col'>
                <div className='card'>
                    <img className='card-img-top' src={"https://image.tmdb.org/t/p/w185"+this.props.poster}/>
                    <div className='card-body'>
                        <h4>{this.props.title}</h4>
                        <h5>{this.props.date}</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieInfoCard;