import React from "react";
import "../../css/app.css";
import Timeline from "./Timeline";
import TodayQuestion from "./TodayQuestion";
import Explore from "./Explore";

export default class Universe extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            myResponses: [],
            myTodayResponses: [],
            exploreResponses: [],
            dataRendered: 0,
            dataToRender: 2 // past responses, explore responses
        }
    }

    componentDidMount() {
        this.getPastResponses();
        this.getExploreResponses();
        //this.initialScroll();
        this.redirect();
    }

    redirect = () => {
        location.href = '#today';
    }

    /*initialScroll = () => {
        var today = this.refs.today;
        today.scrollIntoView();
    }*/

    render() {

        var timeline = this.state.responded ? (<a href="#timeline" className = "timeline-btn">Timeline</a>):(null)
        var explore = this.state.responded ? (<a href="#explore" className = "explore-btn">Explore</a>):(null)

        if (this.state.dataRendered >= this.state.dataToRender) {
            return (
                <div className = "universe"> 
                    <div className = "page explore" id="explore">
                        <Explore
                            day={this.props.day}
                            month={this.props.month} 
                            year={this.props.year}
                            userInfo={this.props.userInfo}
                            todayQuestion={this.props.todayQuestion}
                            exploreResponses={this.state.exploreResponses}
                        />
                    </div>
                    <div className = "page today" id="today">
                        {explore}
                        <TodayQuestion
                            day={this.props.day}
                            month={this.props.month} 
                            year={this.props.year}
                            userInfo={this.props.userInfo}
                            todayQuestion={this.props.todayQuestion}
                            myTodayResponses={this.state.myTodayResponses}
                            updateResponded={this.updateResponded}
                            addMyResponse={this.addMyResponse}
                        />
                        {timeline}
                    </div>
                    <div className = "page timeline" id="timeline">
                        {explore}
                        <Timeline
                            day={this.props.day}
                            month={this.props.month}
                            userInfo={this.props.userInfo}
                            questions={this.props.questions}
                            myResponses={this.state.myResponses}
                        />
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }

    updateResponded = () => {
        this.setState({
            responded: true,
        })
    }

    // GET all past responses
    getPastResponses = () => {
        fetch('/api/responses?me=true')
            .then(res => res.json())
            .then(
                responses => {
                    this.setState({ myResponses: responses });
                    console.log("past responses retrieved!");
                    console.log(this.state.myResponses);
                } 
            ).then(() => {
                this.getTodayResponses();
            })
    }

    // sort out past responses for today's date
    getTodayResponses = () => {
        const todayResponses = [];
        let i, response;
        for (i=0; i<this.state.myResponses.length; i++) {
            response = this.state.myResponses[i];
            if ((response.day === this.props.day) && (response.month === this.props.month)) {
                todayResponses.push(response);
            }
        }
        // sort todayResponses by descending years
        todayResponses.sort((a, b) => (b.year - a.year));
        this.setState({
            myTodayResponses: todayResponses,
            dataRendered: this.state.dataRendered + 1
        });
        console.log("today's responses retrieved!");
        console.log(this.state.myTodayResponses);
    }

    // GET all public/anonymous for today
    getExploreResponses = () => {
        fetch('/api/responses?day=' + this.props.day + '&month=' + this.props.month + '&year=' + this.props.year)
            .then(res => res.json())
            .then(
                responses => {
                    this.setState({
                        exploreResponses: responses,
                        dataRendered: this.state.dataRendered + 1
                    });
                    console.log("responses retrieved!");
                    console.log(this.state.exploreResponses);
                }
            );
    }

    // adds/edits a personal response
    addMyResponse = (response) => {
        const tempResponses = this.state.myTodayResponses;
        if ((tempResponses.length > 0) && (tempResponses[0].year === this.props.year)) {
            tempResponses[0].content = response.content;
            tempResponses[0].privacy = response.privacy;
        } else {
            tempResponses.unshift(response);
        }
        this.setState({ myTodayResponses: tempResponses });
    }

}

