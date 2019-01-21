import React from "react";
import "../../css/timeline.css";
import Day from "./Day"
import DayEntry from "./DayEntry"

class Monthline extends React.Component {
  
    

    constructor(props) {
        super(props);
        
        this.state = {
            monthLength: 2,
            dayEntries: ["active","inactive","inactive","active","active","active","active","inactive","inactive","active","active","inactive","inactive","active","inactive","active","active","inactive","inactive","active","active","inactive","inactive","active","inactive","active","active","inactive","inactive","active","inactive"] ,
            showEntry: false
        }

    
    }

    setMonthLength = (inputMonth) => {
        console.log("hi")
        if (inputMonth == "jan" ||inputMonth ==  "mar" ||inputMonth ==  "may" || inputMonth == "jul" || inputMonth == "aug" ||inputMonth ==  "oct" || inputMonth == "dec") {
            this.setState({monthLength: 31})
        }
        else if (inputMonth == "feb") {
            this.setState({monthLength: 28})
        }
        else {
            this.setState({monthLength: 30})
        }
    }

    componentDidMount() {
        console.log(this.props.selectedMonth)
        this.setMonthLength(this.props.selectedMonth);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedMonth != prevProps.selectedMonth) {
            this.setMonthLength(this.props.selectedMonth);  
        }
    }

    changeShowState = () => {
        console.log("click registered !")
        this.setState(prevState => ({
            showEntry: !prevState.showEntry
          }));
      };
  
    render() {
        
        var entryComponent = this.state.showEntry ? (<DayEntry/>) : (null);

    return (
        <div>
            <section>
                {entryComponent}
                
            </section>
        
            <section className="timeline">
                <ol>
                    
                    {Array.from(Array(this.state.monthLength).keys()).map(y => (
                        <Day
                            key={y}
                            activity={this.state.dayEntries[y]}
                            entryFunction={this.changeShowState}
                        />
                    ))} 

                    
                </ol>
            </section>

        </div>
    
    );
  }
}

export default Monthline;
