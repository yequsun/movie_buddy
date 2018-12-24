import React, { Component } from 'react';
import ShowtimeForm from './showtimeForm'
class ShowtimeCard extends Component{

    render(){
        return(
            <div>
                <h3>{this.props.title}</h3>
                <div className='row'>
                    {this.props.showtimes.slice(0,5).map(showtime => (
                        <ShowtimeForm title={this.props.title} theatreName={showtime.theatre.name} ticket={showtime.ticketURI} dateTime={showtime.dateTime}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default ShowtimeCard;