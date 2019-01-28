import React from "react";
import "../../css/home.css";
import "../../css/app.css";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class StarContent extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            thisvote: this.props.upvoted,
        }
    }
    
    starClick = (event) => {
        let box = document.getElementById("heartbutton");
        if (event.target !== box){
            this.props.handleClick();
        }
    }

    handleUpvote = () => {
        this.setState(prevState=> ({
            thisvote: !prevState.thisvote
        }));
        
        this.props.toggleUpvote();
    }

    render(){
        let heart = this.state.thisvote ? (<div className = "heart2" id = "heartbutton" onClick={this.handleUpvote}></div>) : 
            (<div className = "heart1" id = "heartbutton" onClick={this.handleUpvote}></div>)

        return(
            <div className = "page" onClick={event => this.starClick(event)}>
                <ReactCSSTransitionGroup
                    transitionName="appear"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    
                    <div className = "starbox" id = "starbox">
                        <div className = "top-bar">
                            <div className = "user-icon"> 
                                {this.props.username}
                            </div>
                            <div className = "heart-icon">
                                {//<div className = "heart1" onClick={this.props.toggleUpvovte}></div>
                                }
                                {heart}
                                <div className = "count">{this.props.upvotes}</div>
                            </div>
                        </div>
                        <div className = "star-content">
                            {this.props.content}
                        </div>
                        
                    </div>
                </ReactCSSTransitionGroup>
                
            </div>
        )
    }

}

//call toggleUpvote
// prop upvoted -- if star has already been upvoted