import React from "react";
import "../../css/home.css";
import "../../css/app.css";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class StarContent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            thisvote: this.props.upvoted,
            upvotes: this.props.upvotes
        }
    }
    
    // handles the event of a click anywhere outside of the upvote button
    starClick = (event) => {
        let box = document.getElementById("heartbutton");
        if (event.target !== box){
            this.props.handleClick();
        }
    }

    // handles an upvote button click
    handleUpvote = () => {
        this.setState(prevState=> ({
            thisvote: !prevState.thisvote,
            upvotes: prevState.upvotes + (prevState.thisvote ? (prevState.upvotes > 0 ? -1 : 0) : 1)
        }));
        this.props.toggleUpvote();
    }

    render(){
        // create upvote button
        let heart = this.state.thisvote ? (<div className = "heart2" id = "heartbutton" onClick={this.handleUpvote}></div>) : 
            (<div className = "heart1" id = "heartbutton" onClick={this.handleUpvote}></div>)
        const username = (!this.props.username ? "anonymous" : this.props.username);
        return (
            <div className = "page" onClick={event => this.starClick(event)} style={{zIndex: 9}}>
                <div className = "starbox" id = "starbox">
                    <div className = "top-bar">
                        <div className = "user-icon"> 
                            written by <b>{username}</b>
                        </div>
                        <div className = "heart-icon">
                            {heart}
                        </div>
                            <div className = "count">{this.state.upvotes}</div>
                    </div>
                    <div className = "star-content">
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }

}