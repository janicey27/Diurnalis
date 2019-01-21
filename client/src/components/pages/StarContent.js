import React from "react";
import "../../css/home.css";
import "../../css/app.css";

export default class Star extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "starbox" onClick={this.props.handleClick}>
                {this.props.content}
            </div>
        )
    }

}