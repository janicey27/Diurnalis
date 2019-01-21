import React from "react";
import "../../css/home.css";
import "../../css/app.css";

export default class Star extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            top: '10vh',
            left: '10vw',
        }
    }

    setStyle = (event) => {
        const top = String(Math.random()*100)+'vh'
        const left = String(Math.random()*100)+'vw'
        this.setState({
            top: top,
            left: left,
        })
    }

    render(){
        return(
            <div className = "star" style={{top: this.state.top, left: this.state.left}} onClick={this.setStyle}> 
                
            </div>
        )
    }
}

