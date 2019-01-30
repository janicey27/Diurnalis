import React from "react";
import "../../css/timeline.css";
import Day from "./Day"
import DayEntry from "./DayEntry"
import AnimateOnChange from 'react-animate-on-change'

class Monthline extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            dayEntries: [],
            showEntry: false,
            selectedDay: -1,
            responseArray: [],
            monthUpdate: false,
        }
    }

    componentDidMount() {
        this.initializeSocket();
    }

    // initialize socket
    initializeSocket = () => {
        // listen for post, update "active" green dot state
        this.props.socket.on("post", (response) => {
            if (response.creatorID === this.props.userInfo._id) {
                if (response.month === this.props.selectedMonth) {
                    const activityArray = this.state.dayEntries;
                    activityArray[response.day-1] = "active";
                    this.setState({ dayEntries: activityArray });
                }
            }
        });
    }

    setDayEntries = () => {
        const activityArray = []
        let i;
        for (i=0; i<this.props.monthLength; i++) { //initiates dayEntries with length of the selected month
            activityArray.push("inactive");
        }
        
        const responses = this.props.responseArray;
        let j, activeIndex;
        for (j=0; j<responses.length; j++) { //iterates through responseArray to find days with entries
            if (responses[j][0]===this.props.selectedMonth) {
                activeIndex = responses[j][1]-1; 
                activityArray[activeIndex] = "active";
            }
        }
        this.setState({dayEntries: activityArray});
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.selectedMonth !== prevProps.selectedMonth) {
            this.setDayEntries();
            this.setState({monthUpdate: true});
        }
    }

    entryFunction = (setDay) => {
        this.setState({selectedDay: setDay});
        this.setState({monthUpdate: false});
    };
  
    render() {
        return (
            <div>
                <div className = "entry-container">
                    <AnimateOnChange
                    baseClassName="hi"
                    animationClassName="text-enter"
                    animate={true}>
                        <DayEntry dayIndex={this.state.selectedDay} selectedMonth={this.props.selectedMonth} questionArray={this.props.questionArray} responseArray={this.props.responseArray}/>
                    </AnimateOnChange>
                </div>
            
                <section className="timeline">
                    <ol>
                        <AnimateOnChange
                        baseClassName="hii"
                        animationClassName="fade-enter"
                        animate={this.state.monthUpdate}>
                            {Array.from(Array(this.props.monthLength).keys()).map(y => (
                                <Day
                                    key={y}
                                    dayIndex = {y}
                                    activity={this.state.dayEntries[y]}
                                    entryFunction={this.entryFunction}
                                />
                            ))} 
                        </AnimateOnChange>
                    </ol>
                </section>

            </div>
        );
    }
}

export default Monthline;
