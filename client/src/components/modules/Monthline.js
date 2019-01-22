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
            dayEntries: [],//["active","inactive","inactive","active","active","active","active","inactive","inactive","active","active","inactive","inactive","active","inactive","active","active","inactive","inactive","active","active","inactive","inactive","active","inactive","active","active","inactive","inactive","active","inactive"] ,
            showEntry: false,
            selectedDay: 0,
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
       
        var monthIndex = this.props.selectedMonth;
        var j;
        const responses = this.props.responseArray;

        for (j=0; j<responses.length; j++) { //iterates through responseArray to find days with entries
            if (responses[j][0]===monthIndex) {
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
        console.log("click registered !");
        // this.setState(prevState => ({
        //     showEntry: !prevState.showEntry
        //   }));
        this.setState({selectedDay: setDay});
      };
  
    render() {
        
        //var entryComponent = this.state.showEntry ? (<DayEntry/>) : (<DayEntry/>);

    return (
        <div>
            <section>
                 <DayEntry selectedDay={this.state.selectedDay} selectedMonth={this.props.selectedMonth}/>
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
