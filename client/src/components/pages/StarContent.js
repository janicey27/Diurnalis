import React from "react";
import "../../css/home.css";
import "../../css/app.css";

export default class Star extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "page" onClick={this.props.handleClick}>
                <div className = "starbox">
                    {this.props.content}
                </div>
            </div>
            
        )
    }

}