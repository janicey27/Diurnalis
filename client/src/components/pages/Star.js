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

    handleClick = (event) => {
        this.setState(prevState => ({
            showEntry: !prevState.showEntry
          }));
    }

    render(){
        var starEntry = this.state.showEntry ? (<StarContent content ={this.props.content} handleClick={this.handleClick}/>) : (null);

        return(
            <div>
                <div className="star"
                    style={{top: this.props.top, left: this.props.left,
                        height: this.props.size, width: this.props.size}}
                    onClick={this.handleClick}> 
                </div>
                {starEntry}
            </div>
            
        )
    }
}

