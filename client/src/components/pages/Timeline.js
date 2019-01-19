import React from 'react';
import "../css/timeline.css";

class Timeline extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className='page-container'>
                <div className="month-bar">
                    <div className="row justify-content-center">
                        <div className="col-sm">
                            <img src={require("../circle.png")} />
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                        <div className="col-sm">
                        One of three columns
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timeline;