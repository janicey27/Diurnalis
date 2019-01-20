import React from "react";
import "../../css/home.css";
import "../../css/app.css"
import TodayDate from "./TodayDate"

export default class TodayQuestion extends React.Component {
    /*handleSubmit = (event) => {
        event.preventDefault();
        this.props.addStory(this.state.value);
        this.setState({
            value: '' 
        });
    }*/

    /*<div className="input-group my-3">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="New Story" value={this.state.value} onChange={this.handleChange} className="form-control"/>
                    </form>
                </div>
                <div className="input-group-append">
                    <button type="submit" className="btn btn-outline-primary" value="Submit" onClick={this.handleSubmit}>Submit</button>
                </div>*/

    render() {
        return(
            <div className="bigbox">
                <div className="date">
                    <TodayDate/>
                </div> 
                <div className="question">
                    Today's question goes here
                </div>
                <div className="question-group">
                    old questions go here
                    <div className="response">
                        type here
                    </div>
                </div>
                <div className="button-group">
                    <button type="submit" className="btn submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>

        )
    }
}