import React from "react";
import "../../css/home.css";
import "../../css/app.css";
import TodayDate from "./TodayDate";

export default class TodayQuestion extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: '', /* what you already submitted today*/
            privacy: "public", /* your settings for this post*/
            submitted: false,
            responded: false,
        }
    }

    componentDidMount() {
        this.updateResponded();
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

    // POST response content and details
    postResponse = () => {
        const body = {
            day: this.props.day,
            month: this.props.month,
            year: this.props.year,
            content: this.state.value,
            privacy: this.state.privacy
        };
        fetch('/api/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then(response => {
            console.log("Response: " + response.content);
            this.props.addMyResponse(response);
            console.log("posted!");
            console.log(this.props.myTodayResponses[0]);
        }).then(() => {
            this.updateResponded();
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.postResponse();
        this.setState({
            submitted: true,
            responded: true,
        });
        
    }

    handleEdit = (event) => {
        this.setState({
            submitted: false,
        });
    }

    updateResponded = () => {
        if (this.props.myTodayResponses.length > 0){
            if (this.props.myTodayResponses[0].year === this.props.year){
                this.setState({
                    submitted: true,
                    responded: true,
                    value: this.props.myTodayResponses[0].content,
                });
            }
            console.log("user has responded");
            this.props.updateResponded();
        }
    }

    render() {
        const submitted = this.state.submitted;
        const responded = this.state.responded;
        let oldRes;
        let button;
        let form;
        let reminder;

        let priv = this.state.submitted ? (null): (<select id="privacy" className="privacy" onChange={this.handlePrivacy} value={this.state.privacy}>
                        <option value = "public" >Public</option>
                        <option value = "anonymous" >Anonymous</option>
                        <option value = "private" >Private</option> 
                    </select>)
        
        if (responded) {
            if (submitted) {
                button = <button id="edit-btn" type="submit" className="submit" value="Edit" onClick={this.handleEdit}>Edit your response</button>;
                form = <div>{this.state.value}</div>;
                
                
            } else {
                button = <button id="submit-btn" type="submit" className="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>;
                form = <form onSubmit={this.handleSubmit}>
                        <textarea className="daily-response" id="daily-response" type="text" placeholder="Your Response" value={this.state.value} onChange={this.handleChange}/>
                        </form>;
            }
        } else {
            button = <button id="submit-btn" type="submit" className="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>;
            form = <form onSubmit={this.handleSubmit}>
                    <textarea className="daily-response" id="daily-response" type="text" placeholder="Your Response" value={this.state.value} onChange={this.handleChange}/>
                    </form>;
        }

        if (this.props.myTodayResponses.length === 0){
            oldRes = null;
        } else {
            // display all past responses for today's question
            if (responded){
                oldRes = Array.from(Array(this.props.myTodayResponses.length-1).keys()).map(i => (
                    <div key={this.props.myTodayResponses[i+1].year} className="response">{this.props.myTodayResponses[i+1].content}</div>
                ))
            } else {
                oldRes = Array.from(Array(this.props.myTodayResponses.length).keys()).map(i => (
                    <div key={this.props.myTodayResponses[i].year} className="response">{this.props.myTodayResponses[i].content}</div>
                ))
            }
        }

        return(
            <div className = "today-question" id="today-question">
                <div className = "question-container">
                    <div className="date">
                        <TodayDate month = {this.props.month} day = {this.props.day}/>
                    </div> 
                    <div className="question">
                        {this.props.todayQuestion}
                    </div>
                    
                </div>
                <div className="bigbox">
                    <div className="question-group">
                        <div className="response">
                            {form}
                        </div>
                        {oldRes}
                        <div></div>
                    </div>
                    <div className="button-group">
                        {priv}
                        {button}
                    </div>
                </div>
                {reminder}
                
            </div>
        )
    }
}
