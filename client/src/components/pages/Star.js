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
        this.setState(prevState => ({
            showEntry: true
          }));
    }

    handleClick2 = (event) => {
        this.setState({
            showEntry: false
        })
    }

    render(){
        var starEntry = this.state.showEntry ? (<StarContent content ={this.props.content} handleClick={this.handleClick2}/>) : (null);

        return(
            <div>
                <div className="star"
                    style={{top: this.props.top, left: this.props.left,
                        height: this.props.size, width: this.props.size}}
                    onClick={this.handleClick1}> 
                </div>
                {starEntry}
            </div>
            
        )
    }
}

