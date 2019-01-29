import React from "react";
import io from "socket.io-client";
import "../../css/app.css";
import Timeline from "./Timeline";
import TodayQuestion from "./TodayQuestion";
import Explore from "./Explore";
import NavBar from "../modules/NavBar";
import AnimateOnChange from 'react-animate-on-change';

export default class Universe extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            responded: false
        }

        // create reference for starting screen
        this.todayRef = React.createRef();

        // initialize socket
        this.socket = io("http://localhost:3000");
    }

    componentDidMount() {
        this.initialScroll();
    }

    initialScroll = () => {
        this.todayRef.current.scrollIntoView();
    }

    timelineScroll = () => {
        document.querySelector('#timeline').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    exploreScroll = () => {
        document.querySelector('#explore').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    render() {
        // create nav buttons
        let timeline = this.state.responded ? (<div className="timeline-btn" onClick={this.timelineScroll}>View your past entries <i className="fas fa-arrow-down"></i></div>):(null)
        let explore = this.state.responded ? (<div className="explore-btn" onClick={this.exploreScroll}>Explore public responses <i className="fas fa-arrow-up"></i></div>):(null)
        let reminder = this.state.responded? (<div className="reminder">
        Come back tomorrow to answer the next question and unlock the next piece of your timeline! </div>) : (null)

        // create the three website components
        return (
            <div className = "universe">
                <NavBar logout={this.props.logout} />
                <div className = "page explore" id="explore">
                    <Explore
                        day={this.props.day}
                        month={this.props.month} 
                        year={this.props.year}
                        userInfo={this.props.userInfo}
                        todayQuestion={this.props.todayQuestion}
                        exploreResponses={this.props.exploreResponses}
                        socket={this.socket}
                    />
                    {timeline}
                </div>
                <div className = "page today" id="today" ref={this.todayRef}>
                    {explore}
                    {timeline}
                    <AnimateOnChange
                        animationClassName="fade-enter"
                        animate={true}>
                        <TodayQuestion
                            day={this.props.day}
                            month={this.props.month} 
                            year={this.props.year}
                            userInfo={this.props.userInfo}
                            todayQuestion={this.props.todayQuestion}
                            myTodayResponses={this.props.myTodayResponses}
                            addMyResponse={this.props.addMyResponse}
                            updateResponded={this.updateResponded}
                        />
                    </AnimateOnChange>
                    {reminder}
                </div>
                <div className = "page timeline-p" id="timeline">
                    {explore}
                    <Timeline
                        day={this.props.day}
                        month={this.props.month}
                        userInfo={this.props.userInfo}
                        questions={this.props.questions}
                        myResponses={this.props.myResponses}
                        socket={this.socket}
                    />
                </div>
            </div>
        )
    }

    updateResponded = () => {
        this.setState({
            responded: true,
        })
    }

}

