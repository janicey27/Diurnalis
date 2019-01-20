import React from 'react';
import "../../css/timeline.css";
import Month from "../modules/Month.js"

class Timeline extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className='page-container justify-content-center'>
                <div className="monthline">
                    
                </div>
                <div className="month-bar ">
                    <div className="row no-gutters">
                        <div className="col-sm">
                        <Month /> 
                        </div>
                        <div className="col-sm">
                        <Month /> 
                        </div>
                        <div className="col-sm">
                        <Month /> 
                        </div>
                        <div className="col-sm">
                        <Month /> 
                        </div>
                        <div className="col-sm">
                        <Month /> 
                        </div>
                        <div className="col-sm">
                        <Month /> 
                        </div>
                        <div className="col-sm">
                        <Month /> 
                        </div>
                        <div className="col-sm">
                        <Month /> 
                        </div>
                        <div className="col-sm">
                        <Month /> 
                        </div>
                        <div className="col-sm">
                        <Month />
                         </div>
                        <div className="col-sm">
                        <Month /> 
                         </div>
                        <div className="col-sm">
                        <Month /> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timeline;