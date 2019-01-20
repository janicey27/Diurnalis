import React from "react";
import "../../css/home.css";
import "../../css/app.css"
import TodayDate from "./TodayDate"

export default class TodayQuestion extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: {/* what you already submitted today*/},
            privacy: {/* your settings for this post*/},
            submitted: false
        }
    }
    
    handlePrivacy = (event) => {
        this.setState({
            privacy: event.target.value
        })
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value 
        });
    }
    
    

    handleSubmit = (event) => {
        event.preventDefault();
        //save content;
        //save privacy settings;
        this.setState({
            submitted: true
        });

    }

    handleEdit = (event) => {
        this.setState({
            submitted: false
        })
    }

    render() {
        const submitted = this.state.submitted;
        let button;
        let form;

        if (submitted) {
            button = <button id="edit-btn" type="submit" className="submit" value="Edit" onClick={this.handleEdit}>Edit</button>;
            form = <div>{this.state.value}</div>;
        } else {
            button = <button id="submit-btn" type="submit" className="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>;
            form = <form onSubmit={this.handleSubmit}>
                    <input id="daily-response" type="text" placeholder="Your Response" value={this.state.value} onChange={this.handleChange}/>
                    </form>;
        }
        

        return(
            <div className="bigbox">
                <div className="date">
                    <TodayDate/>
                </div> 
                <div className="question">
                    Today's question goes here
                    {/*query today's question*/}
                </div>
                <div className="question-group">
                    old questions go here
                    {/*query old responses*/}
                    <div className="response">
                        {form}
                    </div>
                </div>
                <div className="button-group">
                    <select id="privacy" className="privacy" id="daily-response" onChange={this.handlePrivacy}>
                        <option value = "private" >Private</option> 
                        <option value = "anonymous" >Anonymous</option>
                        <option value = "public" >Public</option>
                    </select>
                    {button}
                </div>
            </div>
        )
    }
}
