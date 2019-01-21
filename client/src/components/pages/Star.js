import React from "react";
import "../../css/home.css";
import "../../css/app.css";

export default class Star extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "star" 
                style={{top: this.props.top, left: this.props.left,
                        height: this.props.size, width: this.props.size}}> 
                
            </div>
        )
    }
}

