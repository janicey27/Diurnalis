import React from "react";
import "../../css/app.css";
import Timeline from "./Timeline";
import TodayQuestion from "./TodayQuestion";
import Explore from "./Explore";

export default class Universe extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className = "universe"> 
                <div className = "settings">
                    Settings
                </div>
                <div className = "page explore">
                    <Explore/>
                </div>
                <div className = "page today">
                    <TodayQuestion/>
                </div>
                <div className = "page timeline">
                    <Timeline/>
                </div>
            </div>
        )
    }

}

