import React from "react";
import "../../css/home.css";
import "../../css/app.css";

export default class Star extends React.Component{
    constructor(props){
        super(props);
    }

    testClick = (event) => {
        console.log(event.target);
    }

    render(){
        let heart = <img className = "heart"></img>
        return(
            <div className = "page" onClick={event => this.testClick(event)}>
                <div className = "starbox">
                    {this.props.content}
                    <div className = "heart-box">
                        {heart}
                    </div>
                </div>
            </div>
        )
    }

}

//call toggleUpvote
// prop upvoted -- if star has already been upvoted