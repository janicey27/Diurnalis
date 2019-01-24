import React from "react";

export default class TodayDate extends React.Component{

    constructor(props) {
        super(props);
        
        const monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
        const month = monthArr[this.props.month - 1];
        const todayDate = month + ' ' + this.props.day;

        this.state = {
            date: todayDate
        };
    }

    render() {
        return (
            <div>
                {this.state.date}
            </div>
        );
    }
    
}