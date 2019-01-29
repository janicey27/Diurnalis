import React from "react";

export default class TodayDate extends React.Component{

    constructor(props) {
        super(props);
        
        const monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
        const month = monthArr[this.props.month - 1];
        const todayDate = month + ' ' + this.props.day;

        // create string that represents today's date
        this.state = {
            date: todayDate
        };
    }

    // componentDidUpdate(prevProps) {
    //     // 
    //     if (this.props.day != prevProps.day) { //switching days
    //         // console.log("component did Update");
    //         // console.log(this.props.selectedDay);
    //         // this.updateEntry(this.props.selectedDay);
    //         // console.log(this.props.dayIndex)
    //         this.setState((prevState, props) => ({day: props.day}));
    //         console.log("okkkk");
        
    //     }
    //     else if (this.props.month !=prevProps.month) { //switching months
 
    //         this.setState((prevState, props) => ({month: monthArr[this.props.month - 1]}));
    //         console.log("okk");
      
    //       }
    // }

    render() {
        return (
            <div>
                <h4>
                    {this.state.date}
                </h4>
            </div>
        );
    }
    
}