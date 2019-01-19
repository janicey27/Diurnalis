import React from "react";
import "../../css/home.css";
import "../../css/app.css"
import TodayDate from "./TodayDate"

export default class TodayQuestion extends React.Component {
    render() {
        return(
            <div className="center">
                <TodayDate/>
            </div>

        )
    }
}