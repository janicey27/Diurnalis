import React from "react";
import io from "socket.io-client";
import "../../css/home.css";
import "../../css/app.css";
import Star from "./Star";

export default class Explore extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            stars: []
        };
    }

    componentDidMount() {
        //this.initializeSocket();
    }

    render() {
        this.generateStars();
        return(
            <div className = "sky">
                <div className = "background-q">
                    {this.props.question}
                </div>
                {this.state.stars}
            </div>
        )
    }

    generateStars = () => {
        let response;
        for (var i = 0; i < this.props.exploreResponses.length; i++) {
            response = this.props.exploreResponses[i];
            this.state.stars.push(<Star 
                key={i}
                top={String(Math.random()*96+2)+'vh'} 
                left={String(Math.random()*96+2)+'vw'}
                size={String(Math.random()*15+10)+'px'} // to be updated based on like data
                content={response.content}
                upvotes={response.upvotes}
            />);
            console.log(this.state.stars);
        }
    }

    initializeSocket = () => {
        this.socket = io();
        this.socket.on("post", (response) => {
            console.log("Hello world! heh");
            this.state.stars.push(<Star 
                key={this.state.stars.length}
                top={String(Math.random()*96+2)+'vh'} 
                left={String(Math.random()*96+2)+'vw'}
                size={String(Math.random()*15+10)+'px'} // to be updated based on like data
                content={response.content}
                upvotes={response.upvotes}
            />);
        });
    }
}