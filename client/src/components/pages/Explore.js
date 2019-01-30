import React from "react";
import _ from "underscore";
import "../../css/home.css";
import "../../css/app.css";
import Star from "../modules/Star";
import config_data from "../../../../config";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const MAX_STARS = config_data.MAX_STARS;

export default class Explore extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            stars: [],
            starArr: [],
            helper: true // guides user around
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
            helper: false,
        });
    }

    render() {
        // generates help text
        let helper = this.state.helper ? (
            <ReactCSSTransitionGroup
                    transitionName="helperhint"
                    transitionLeaveTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeave={true}>
                <div className = "helper">
                Click on a star to explore others' responses to today's question!
                </div>
            </ReactCSSTransitionGroup>
        ) : null;
        
        return (
            <div className = "sky" id="sky" onClick={this.changeHelper}>
                <div className = "background-q">
                    {this.props.todayQuestion}
                    {helper}
                </div>
                {this.state.stars}
            </div>
        )
    }

    // change render state
    toggleRenderState = (newState) => {
        this.renderState = newState;
        if (this.renderState) {
            this.rerender();
        }
    }

    // rerender by setting "stars" equal to the changing "starArr"
    rerender = () => {
        this.setState({
            stars: this.state.starArr.slice(0)
        });
    }

    // create array of Star elements from exploreResponses
    generateStars = () => {
        let sampleStars, i, response, upvoted;
        console.log(MAX_STARS);
        sampleStars = Array.from(Array(this.props.exploreResponses.length).keys());
        if (this.props.exploreResponses.length > MAX_STARS) {
            sampleStars = _.sample(sampleStars, MAX_STARS);
        }
        for (i = 0; i < sampleStars.length; i++) {
            response = this.props.exploreResponses[sampleStars[i]];
            upvoted = response.upvoteUsers.includes(this.props.userInfo._id);
            this.state.starArr.push(<Star
                key={i}
                top={String(Math.random()*88+2)+'vh'}
                left={String(Math.random()*96+1)+'vw'}
                size={String(Math.min(response.upvotes*2,20)+25)+'px'} // to be updated based on like data
                responseID={response._id}
                username={response.creatorUsername}
                content={response.content}
                upvotes={response.upvotes}
                upvoted={upvoted}
                toggleUpvote={this.toggleUpvote}
                toggleRenderState={(newState) => this.toggleRenderState(newState)}
            />);
        }
    }

    removeResponse = (responseID) => {
        let i, star;
        for (i=0; i<this.state.starArr.length; i++) {
            star = this.state.starArr[i];
            if (star.props.responseID === responseID) {
                this.state.starArr.splice(i, 1);
                if (this.renderState) {
                    this.rerender();
                }
                break;
            }
        }
    }

    // initialize socket listeners
    initializeSocket = () => {
        // client-side handling post sent through socket
        this.props.socket.on("post", (response) => {
            if (this.state.starArr.length < MAX_STARS) {
                const upvoted = response.upvoteUsers.includes(this.props.userInfo._id);
                this.state.starArr.push(
                    <Star 
                        key={this.state.starArr.length}
                        top={String(Math.random()*88+2)+'vh'} 
                        left={String(Math.random()*96+1)+'vw'}
                        size={String(Math.min(response.upvotes*2,20)+25)+'px'} // to be updated based on like data
                        responseID={response._id}
                        username={response.creatorUsername}
                        content={response.content}
                        upvotes={response.upvotes}
                        upvoted={upvoted}
                        toggleUpvote={this.toggleUpvote}
                        toggleRenderState={(newState) => this.toggleRenderState(newState)}
                    />
                );
                if (this.renderState) {
                    this.rerender();
                }
            }
        });

        // client-side handling of edit sent through socket
        this.props.socket.on("edit", (response) => {
            let i, star, found=false;
            for (i=0; i<this.state.starArr.length; i++) {
                star = this.state.starArr[i];
                if (star.props.responseID === response._id) {
                    const newStar = React.cloneElement(
                        star,
                        {
                            username: response.creatorUsername,
                            content: response.content
                        }
                    );
                    this.state.starArr[i] = newStar;
                    found = true;
                    if (this.renderState) {
                        this.rerender();
                    }
                    break;
                }
            }
            if ((!found) && (this.state.starArr.length < MAX_STARS)) {
                const upvoted = response.upvoteUsers.includes(this.props.userInfo._id);
                this.state.starArr.push(
                    <Star 
                        key={this.state.starArr.length}
                        top={String(Math.random()*88+2)+'vh'}
                        left={String(Math.random()*96+1)+'vw'}
                        size={String(Math.min(response.upvotes*2,20)+25)+'px'} // to be updated based on like data
                        responseID={response._id}
                        username={response.creatorUsername}
                        content={response.content}
                        upvotes={response.upvotes}
                        upvoted={upvoted}
                        toggleUpvote={this.toggleUpvote}
                        toggleRenderState={(newState) => this.toggleRenderState(newState)}
                    />
                );
                if (this.renderState) {
                    this.rerender();
                }
            }
        });

        // client-side handling of upvote sent through socket
        this.props.socket.on("upvote", (response) => {
            let i, star;
            for (i=0; i<this.state.starArr.length; i++) {
                star = this.state.starArr[i];
                if (star.props.responseID === response._id) {
                    const newStar = React.cloneElement(
                        star,
                        {
                            upvotes: star.props.upvotes + 1,
                            size: String(Math.min((star.props.upvotes+1)*2,20)+25)+'px'
                        }
                    );
                    this.state.starArr[i] = newStar;
                    if (this.renderState) {
                        this.rerender();
                    }
                    break;
                }
            }
        });

        // client-side handling downvote sent through socket
        this.props.socket.on("downvote", (response) => {
            let i, star;
            for (i=0; i<this.state.starArr.length; i++) {
                star = this.state.starArr[i];
                if (star.props.responseID === response._id) {
                    const newStar = React.cloneElement(
                        star,
                        {
                            upvotes: ((star.props.upvotes > 0) ? (star.props.upvotes - 1) : 0),
                            size: String(Math.min((star.props.upvotes-1)*2,20)+25)+'px'
                        }
                    );
                    this.state.starArr[i] = newStar;
                    if (this.renderState) {
                        this.rerender();
                    }
                    break;
                }
            }
        });
    }

    // handles personal upvoting and downvoting; to be passed as a prop to Star elements
    toggleUpvote = (responseID) => {
        const starArr = this.state.starArr;

        // find the star that matches the response ID and toggle upvote
        let i, star, remove = false;
        for (i=0; i<starArr.length; i++) {
            star = starArr[i];
            if (star.props.responseID === responseID) {
                remove = star.props.upvoted;
                const newStar = React.cloneElement(
                    star,
                    { upvoted: !remove }
                );
                this.state.starArr[i] = newStar;
                break;
            }
        }

        // post upvote/downvote request to api
        const body = {
            parent: responseID,
            remove: remove
        };
        fetch('/api/upvote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json());
    }
}