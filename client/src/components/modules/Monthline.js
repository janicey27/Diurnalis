import React from "react";
import "../../css/monthline.css";
import Day from "./Day"

class Monthline extends React.Component {
  
    setMonthLength = (inputMonth) => {
        console.log("hi")
        if (inputMonth == "jan" ||inputMonth ==  "mar" ||inputMonth ==  "may" || inputMonth == "jul" || inputMonth == "aug" ||inputMonth ==  "oct" || inputMonth == "dec") {
            this.setState({monthLength: 1})
        }
        else if (inputMonth == "feb") {
            this.setState({monthLength: 2})
        }
        else {
            this.setState({monthLength: 3})
        }
    }

    constructor(props) {
        super(props);
        
        this.state = {
            monthLength: 30,
            dayEntries: ["active","inactive","inactive","active","active","active","active","inactive","inactive","active","active","inactive","inactive","active","inactive","active","active","inactive","inactive","active","active","inactive","inactive","active","inactive","active","active","inactive","inactive","active","inactive"] 
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
  
    render() {
        
    return (
        <div>

        
            <section className="timeline">
                <ol>
                    
                    {Array.from(Array(this.state.monthLength).keys()).map(y => (
                        <Day activity={this.state.dayEntries[y]}/>
                    ))} 

                    
                </ol>
            </section>

        </div>
    
    );
  }
}

export default Monthline;
