import React from "react";

export default class TodayDate extends React.Component{
    constructor() {
        super();
        
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth();
        var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
        month = monthArr[month];
        var date = month + ' ' + day;

        this.state = {
            date: date
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