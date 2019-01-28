import React from "react";
import "../../css/home.css";
import "../../css/app.css";
import StarContent from "./StarContent"

export default class Star extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showEntry: false,
        }
    }

    handleClick1 = (event) => {
        this.setState({
            showEntry: true
        });
        this.props.toggleRenderState(false);
    }

    handleClick2 = (event) => {
        this.setState({
            showEntry: false
        });
        this.props.toggleRenderState(true);
    }

    render(){
        var starEntry = this.state.showEntry ? (<StarContent content={this.props.content} handleClick={this.handleClick2} toggleUpvote={this.props.toggleUpvote} upvoted={this.props.upvoted} upvotes={this.props.upvotes} />) : (null);

        return(
            <div>
                <div className="star"
                    style={{top: this.props.top, left: this.props.left,
                        height: this.props.size, width: this.props.size}}
                    onClick={this.handleClick1} />
                {starEntry}
            </div>
        )
    }
}

