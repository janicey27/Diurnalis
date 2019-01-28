import React from "react";
import io from "socket.io-client";
import "../../css/home.css";
import "../../css/app.css";
import Star from "./Star";

export default class Explore extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            stars: [],
            helper: true
        };
    }

    componentDidMount() {
        this.generateStars();
        this.initializeSocket();
    }

    changeHelper = () => {
        this.setState({
            helper: false,
        });
    }

    render() {
        let helper = this.state.helper ? (
            <div className = "helper">
                Click on a star to explore other people's responses!
            </div>
        ) : (null)
        
        console.log("Message to toggle: " + this.props.exploreResponses[0].content);
        console.log("Starting upvotes: " + this.props.exploreResponses[0].upvotes); // TESTING
        return (
            <div className = "sky" id="sky">
                <div className = "background-q">
                    {this.props.todayQuestion}
                    {helper}
                </div>
                {/*
                <div>
                    <button onClick={this.upvoteTest}>This is a test button</button>
                </div>
                */}
                {this.state.stars}
            </div>
        )
    }

    generateStars = () => {
        const starArr = [];
        let i, response, upvoted;
        for (i = 0; i < this.props.exploreResponses.length; i++) {
            response = this.props.exploreResponses[i];
            upvoted = response.upvoteUsers.includes(this.props.userInfo._id);
            starArr.push(<Star 
                key={i}
                top={String(Math.random()*96+2)+'vh'}
                left={String(Math.random()*96+2)+'vw'}
                size={String(Math.random()*15+30)+'px'} // to be updated based on like data
                responseID={response._id}
                username={response.creatorUsername}
                content={response.content}
                upvotes={response.upvotes}
                upvoted={upvoted}
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
                        username={response.creatorUsername}
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
                    const newStar = React.cloneElement(
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
                    const newStar = React.cloneElement(
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

    toggleUpvote = (response) => {
        const starArr = this.state.stars;
        let i, star, remove = false;
        for (i=0; i<starArr.length; i++) {
            star = starArr[i];
            if (star.props.responseID === response._id) {
                remove = star.props.upvoted;
                break;
            }
        }
        const newStar = React.cloneElement(
            star,
            {
                upvotes: star.props.upvotes + (remove ? -1 : 1),
                upvoted: !star.props.upvoted
            }
        );
        console.log("new star in toggleUpvote: " + newStar.props.upvotes);
        starArr[i] = newStar;
        this.setState({
            stars: starArr
        });
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

    upvoteTest = () => {
        this.toggleUpvote(this.props.exploreResponses[0]);
    }
}