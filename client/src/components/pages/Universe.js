import React from "react";
import "../../css/app.css";
import Timeline from "./Timeline";
import TodayQuestion from "./TodayQuestion";
import Explore from "./Explore";
import AnimateOnChange from 'react-animate-on-change'

export default class Universe extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            responded: false
        }

        this.todayRef = React.createRef();
    }

    componentDidMount() {
        this.initialScroll();
    }

    redirect = () => {
        location.href = './#something';
        window.scrollBy({
            top: 100,
            left: 0,
            behavior: 'smooth',
        })
    }

    initialScroll = () => {
        this.todayRef.current.scrollIntoView();
    }

    render() {

        let timeline = this.state.responded ? (<a href="#timeline" className = "timeline-btn">View your past entries <i className="fas fa-arrow-down"></i>        </a>):(null)
        let explore = this.state.responded ? (<a href="#explore" className = "explore-btn">Explore public responses <i className="fas fa-arrow-up"></i>        </a>):(null)
        let reminder = this.state.responded? (<div className="reminder">
        Come back tomorrow to answer the next question and unlock the next piece of your timeline! </div>) : (null)

        return (
            <div className = "universe">
                <div className = "page explore" id="explore">
                    <Explore
                        day={this.props.day}
                        month={this.props.month} 
                        year={this.props.year}
                        userInfo={this.props.userInfo}
                        todayQuestion={this.props.todayQuestion}
                        exploreResponses={this.props.exploreResponses}
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

