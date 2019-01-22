import React from "react";
import "../../css/home.css";
import "../../css/app.css";
import TodayDate from "./TodayDate";

export default class TodayQuestion extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            day: 32, // day, month, and year should probably be props passed down from somewhere above
            month: 13,
            year: 1000,
            value: '',//* what you already submitted today*/}
            privacy: 'private',//* change to default,
            submitted: false,
            responded: false,
            userResponses: [],
            pastResponses: []
        }
    }

    componentDidMount() { // for testing purposes
        this.getUser();
        this.getPastResponses();
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

    // GET user
    getUser = () => {
        fetch('/api/whoami')
            .then(res => res.json())
            .then(res => console.log(res));
    }
  
    // GET past responses
    getPastResponses = () => {
        fetch('/api/responses?me=true')
            .then(res => res.json())
            .then(
                responses => {
                    this.setState({ userResponses: responses });
                    console.log("past responses retrieved!");
                    console.log(this.state.userResponses);
                    this.getTodayResponses();
                }
            );
    }

    // select responses for current date
    getTodayResponses = () => {
        let todayResponses = [];
        let i;
        for (i=0; i<this.state.userResponses.length; i++) {
            if ((this.state.userResponses[i].day === this.state.day) && (this.state.userResponses[i].month === this.state.month)) {
                todayResponses.push(this.state.userResponses[i]);
            }
        }
        // sort todayResponses by descending years
        todayResponses.sort((a, b) => (b.year - a.year));
        this.setState({ pastResponses: todayResponses });
        console.log("today's responses retrieved!");
        console.log(todayResponses);
    }

    // POST response content and details
    postResponse = () => {
        const body = {
            day: this.state.day,
            month: this.state.month,
            year: this.state.year,
            content: this.state.value,
            privacy: this.state.privacy
        };
        fetch('/api/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(() => {
            console.log("posted!");
            console.log(body);
        }).then(() => {
            this.getPastResponses();
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
        if (!this.state.pastResponses && this.state.pastResponses[0].year == this.state.year){
            this.setState({
                responded: true,
            })
            console.log("user did respond")
        }
    }

    render() {
        const submitted = this.state.submitted;
        const responded = this.state.responded;
        let button;
        let form;
        
        if (responded) {
            if (submitted) {
                button = <button id="edit-btn" type="submit" className="submit" value="Edit" onClick={this.handleEdit}>Edit</button>;
                form = <div>{this.state.pastResponses[0]}</div>;
            } else {
                button = <button id="submit-btn" type="submit" className="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>;
                form = <form onSubmit={this.handleSubmit}>
                        <input id="daily-response" type="text" placeholder="Your Response" value={this.state.pastResponses[0]} onChange={this.handleChange}/>
                        </form>;
            }
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
                    {// display all past responses for today's question
                    Array.from(Array(this.state.pastResponses.length).keys()).map(i => (
                        <div key={this.state.pastResponses[i].year} className="response">{this.state.pastResponses[i].content}</div>
                    ))}
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
