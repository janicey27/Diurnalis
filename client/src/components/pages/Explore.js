import React from "react";
import "../../css/home.css";
import "../../css/app.css";
import Star from "./Star";

export default class Explore extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className = "sky">
                <Star/>
            </div>
        )
    }
}