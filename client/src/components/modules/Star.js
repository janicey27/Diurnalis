import React from "react";
import "../../css/home.css";
import "../../css/app.css";
import StarContent from "./StarContent"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Star extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showEntry: false,
        }

        this.upvoted = this.props.upvoted;
        this.upvotes = this.props.upvotes;
    }

    render(){
        // create StarContent panel, to be shown when star is clicked
        const starEntry = this.state.showEntry ? (
            <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionLeave={true}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionAppearTimeout={200}>
        <StarContent username={this.props.username} content={this.props.content} handleClick={this.handleClick2} toggleUpvote={this.toggleUpvote} upvoted={this.upvoted} upvotes={this.upvotes} />
        </ReactCSSTransitionGroup>
        ) : (null);

        return(
            <div className="star-container">
                <div className="star"
                    style={{top: this.props.top, left: this.props.left,
                        height: this.props.size, width: this.props.size}}
                    onClick={this.handleClick1}
                />
                {starEntry}
            </div>
        )
    }

    // toggle client-side upvoted state
    toggleUpvote = () => {
        this.upvotes = this.upvotes + (this.upvoted ? (this.upvotes > 0 ? -1 : 0) : 1);
        this.upvoted = !this.upvoted;
        this.props.toggleUpvote(this.props.responseID);
    }

    // for when star is clicked
    handleClick1 = (event) => {
        this.setState({
            showEntry: true
        });
        this.props.toggleRenderState(false);
    }

    // for when StarContent window is clicked out of
    handleClick2 = (event) => {
        this.setState({
            showEntry: false
        });
        this.props.toggleRenderState(true);
    }
}

