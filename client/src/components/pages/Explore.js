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
            starArr: [],
            helper: true // a "tutorial" of sorts
        };

        this.renderState = true; // determines whether the explore page is currently in a state to allow new stars to appear
    }

    componentDidMount() {
        this.generateStars();
        this.initializeSocket();
        this.rerender();
    }

    changeHelper = () => {
        this.setState({
            helper: !this.state.helper,
        });
    }

    render() {
        let helper = this.state.helper ? (
            <div className = "helper">
                Click on a star to explore others' responses to today's question!
            </div>
        ) : (null)
        
        //console.log("Message to toggle: " + this.props.exploreResponses[0].content);
        //console.log("Starting upvotes: " + this.props.exploreResponses[0].upvotes); // TESTING
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

    toggleRenderState = (newState) => {
        if (newState) {
            this.rerender();
        } else {
            this.renderState = false;
        }
    }

    rerender = () => {
        this.setState({
            stars: this.state.starArr
        });
        this.renderState = true;
    }

    generateStars = () => {
        let i, response, upvoted;
        for (i = 0; i < this.props.exploreResponses.length; i++) {
            response = this.props.exploreResponses[i];
            upvoted = response.upvoteUsers.includes(this.props.userInfo._id);
            this.state.starArr.push(<Star
                key={i}
                top={String(Math.random()*80)+'vh'}
                left={String(Math.random()*96+1)+'vw'}
                size={String(Math.min(response.upvotes,20)+25)+'px'} // to be updated based on like data
                responseID={response._id}
                username={response.creatorUsername}
                content={response.content}
                upvotes={response.upvotes}
                upvoted={upvoted}
                toggleUpvote={this.toggleUpvote.bind(this, response._id)}
                toggleRenderState={this.toggleRenderState}
            />);
        }
        console.log(this.state.starArr);
    }

    initializeSocket = () => {
        this.socket = io("http://localhost:3000");

        this.socket.on("post", (response) => {
            console.log("new post received via socket");
            upvoted = response.upvoteUsers.includes(this.props.userInfo._id);
            this.state.starArr.push(
                <Star 
                    key={this.state.stars.length}
                    top={String(Math.random()*80)+'vh'} 
                    left={String(Math.random()*96+1)+'vw'}
                    size={String(Math.min(response.upvotes,20)+25)+'px'} // to be updated based on like data
                    responseID={response._id}
                    username={response.creatorUsername}
                    content={response.content}
                    upvotes={response.upvotes}
                    upvoted={upvoted}
                    toggleUpvote={this.toggleUpvote.bind(this, response._id)}
                    toggleRenderState={this.toggleRenderState}
                />
            );
            if (this.renderState) {
                this.rerender();
            }
        });

        this.socket.on("upvote", (response) => {
            console.log("upvote received via socket");
            let i, star;
            for (i=0; i<this.state.starArr.length; i++) {
                star = this.state.starArr[i];
                if (star.props.responseID === response._id) {
                    const newStar = React.cloneElement(
                        star,
                        {
                            upvotes: star.props.upvotes + 1,
                            size: String(Math.min(star.props.upvotes+1,20)+25)+'px'
                        }
                    );
                    console.log("new star: " + newStar.props.upvotes);
                    this.state.starArr[i] = newStar;
                    if (this.renderState) {
                        this.rerender();
                    }
                    console.log("received from socket: " + this.state.stars[i].props.upvotes);
                    break;
                }
            }
        });

        this.socket.on("downvote", (response) => {
            console.log("downvote received via socket");
            let i, star;
            for (i=0; i<this.state.starArr.length; i++) {
                star = this.state.starArr[i];
                if (star.props.responseID === response._id) {
                    const newStar = React.cloneElement(
                        star,
                        {
                            upvotes: ((star.props.upvotes > 0) ? (star.props.upvotes - 1) : 0),
                            size: String(Math.min(star.props.upvotes-1,20)+25)+'px'
                        }
                    );
                    console.log("new star: " + newStar.props.upvotes);
                    this.state.starArr[i] = newStar;
                    if (this.renderState) {
                        this.rerender();
                    }
                    break;
                }
            }
        });
    }

    toggleUpvote = (responseID) => {
        const starArr = this.state.stars;
        let i, star, remove = false;
        for (i=0; i<starArr.length; i++) {
            star = starArr[i];
            if (star.props.responseID === responseID) {
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
        response = Response.findOne({ _id: responseID }, function(err, response) { return response; });
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
        this.toggleUpvote(this.props.exploreResponses[0]._id);
    }
}