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
        this.generateStars();
        this.initializeSocket();
    }

    render() {
        console.log("Message to upvote: " + this.props.exploreResponses[0].content);
        console.log("Starting upvotes: " + this.props.exploreResponses[0].upvotes); // TESTING
        return (
            <div className = "sky" id="sky">
                <div className = "background-q">
                    {this.props.todayQuestion}
                </div>
                {this.state.stars}
                {/*<button onClick={this.upvoteResponse(this.props.exploreResponses[0])}>This is a test button</button>*/} { /* TESTING */ }
            </div>
        )
    }

    generateStars = () => {
        const starArr = [];
        let response, i;
        for (let i = 0; i < this.props.exploreResponses.length; i++) {
            response = this.props.exploreResponses[i];
            starArr.push(<Star 
                key={i}
                top={String(Math.random()*96+2)+'vh'} 
                left={String(Math.random()*96+2)+'vw'}
                size={String(Math.random()*15+30)+'px'} // to be updated based on like data
                content={response.content}
                upvotes={response.upvotes}
            />);
        }
        this.setState({
            stars: starArr
        });
        console.log(this.state.stars);
    }

    initializeSocket = () => {
        this.socket = io("http://localhost:3000");

        this.socket.on("post", (response) => {
            console.log("new post received via socket");
            this.setState({
                stars: this.state.stars.concat(
                    <Star 
                        key={this.state.stars.length}
                        top={String(Math.random()*96+2)+'vh'} 
                        left={String(Math.random()*96+2)+'vw'}
                        size={String(Math.random()*15+10)+'px'} // to be updated based on like data
                        responseID={response._id}
                        content={response.content}
                        upvotes={response.upvotes}
                    />
                )
            });
        });

        this.socket.on("upvote", (response) => {
            console.log("upvote received via socket");
            const starArr = this.state.stars;
            let i, star;
            for (i=0; i<starArr.length; i++) {
                star = starArr[i];
                if (star.props.responseID === response._id) {
                    newStar = React.cloneElement(
                        star,
                        { upvotes: star.props.upvotes + 1 }
                    );
                    console.log("new star: " + newStar.props.upvotes);
                    starArr[i] = newStar;
                    this.setState({
                        stars: starArr
                    });
                    console.log("received from socket: " + this.state.stars[i].props.upvotes);
                    break;
                }
            }
        });

        this.socket.on("downvote", (response) => {
            console.log("downvote received via socket");
            const starArr = this.state.stars;
            let i, star;
            for (i=0; i<starArr.length; i++) {
                star = starArr[i];
                if (star.props.responseID === response._id) {
                    newStar = React.cloneElement(
                        star,
                        { upvotes: star.props.upvotes - 1 }
                    );
                    console.log("new star: " + newStar.props.upvotes);
                    starArr[i] = newStar;
                    this.setState({
                        stars: starArr
                    });
                    break;
                }
            }
        });
    }

    upvoteResponse = (response, remove=false) => {
        const body = {
            parent: response,
            remove: remove
        };
        fetch('/api/upvote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then((res) => {
            console.log("received from post: " + res.upvotes);
        });
    }
}