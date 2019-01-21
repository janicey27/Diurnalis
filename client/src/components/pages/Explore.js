import React from "react";
import "../../css/home.css";
import "../../css/app.css";
import Star from "./Star";

export default class Explore extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            numStars: 0,
        }

    }

    handleClick = () => {
        this.setState({
          numStars: this.state.numStars + 1,
          
        }) 
      }
    componentDidMount() {
        this.getPastResponses();
    }
  
    // GET all responses for today
    getPastResponses = () => {
        fetch('/api/responses?day=' + this.props.day + '&month=' + this.props.month + '&year=' + this.props.year)
            .then(res => res.json())
            .then(
                responses => {
                    console.log("responses retrieved!");
                    console.log(responses);
                }
            );
    }

    render(){
        const stars = []; 
        
        for (var i = 0; i < this.state.numStars; i++) { 
            stars.push(<Star 
                top={String(Math.random()*100)+'vh'} 
                left={String(Math.random()*100)+'vw'}
                size={String(Math.random()*20)+'px'} // to be updated based on like data
                //also need to pass in attributes like # of likes
                //content, etc.
                />)
        }

        return(
            <div className = "sky">
                {stars}
                <button onClick = {this.handleClick}></button> 
            </div>
        )
    }
}