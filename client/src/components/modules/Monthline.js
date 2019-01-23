import React from "react";
import "../../css/timeline.css";
import Day from "./Day"
import DayEntry from "./DayEntry"

class Monthline extends React.Component {
  
    

    constructor(props) {
        super(props);
        
        this.state = {
            selectedMonth: "",
            monthLength: 0,
            dayEntries: [],
            showEntry: false,
            selectedDay: -1,
            responseArray: []
        }

    
    }

    // setStates = (month, length, array) => {
    //     this.setState({selectedMonth: month, monthLength: length, responseArray: array});
    // }
    // setMonthLength = (inputMonth) => {
    //     console.log("hi")
    //     if (inputMonth == "jan" ||inputMonth ==  "mar" ||inputMonth ==  "may" || inputMonth == "jul" || inputMonth == "aug" ||inputMonth ==  "oct" || inputMonth == "dec") {
    //         this.setState({monthLength: 31})
    //     }
    //     else if (inputMonth == "feb") {
    //         this.setState({monthLength: 28})
    //     }
    //     else {
    //         this.setState({monthLength: 30})
    //     }
    // }

    setDayEntries = () => {
        var activityArray = []
        var i;
        // console.log(this.props.responseArray)
        for (i=0; i<this.props.monthLength; i++) { //initiates dayEntries with length of the selected month
            activityArray.push("inactive");

        }
        
        const responses = this.props.responseArray;
        var j;
        for (j=0; j<responses.length; j++) { //iterates through responseArray to find days with entries
            if (responses[j][0]===this.props.selectedMonth) {
                var activeIndex = responses[j][1]-1; 
                activityArray[activeIndex] = "active";
            }   
            
        }
        this.setState({dayEntries: activityArray});
    }
    

    componentDidUpdate(prevProps) {
        if (this.props.selectedMonth != prevProps.selectedMonth) {
            // this.setStates(this.props.selectedMonth, this.props.monthLength, this.props.responseArray);
            this.setDayEntries();
        }

    }

    entryFunction = (setDay) => {
        // console.log("click registered !");
        // this.setState(prevState => ({
        //     showEntry: !prevState.showEntry
        //   }));
        this.setState({selectedDay: setDay});
      };
  
    render() {

    return (
        <div>
            <section>
                 <DayEntry dayIndex={this.state.selectedDay} selectedMonth={this.props.selectedMonth} questionArray={this.props.questionArray} responseArray={this.props.responseArray}/>
            </section>
        
            <section className="timeline">
                <ol>
                    
                    {Array.from(Array(this.props.monthLength).keys()).map(y => (
                        <Day
                            key={y}
                            dayIndex = {y}
                            activity={this.state.dayEntries[y]}
                            entryFunction={this.entryFunction}
                        />
                    ))} 

                    
                </ol>
            </section>

        </div>
    
    );
  }
}

export default Monthline;
