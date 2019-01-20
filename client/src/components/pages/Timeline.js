import React from 'react';
import "../../css/timeline.css";
import Month from "../modules/Month.js"
import Monthline from "../modules/Monthline"

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            month: ""
        }

    }

    handleClick(inputMonth) {
        this.setState({month: inputMonth})
    }

    render(){
        return (
            <div className='page-container justify-content-center'>
                <div className="monthline">
                    <Monthline selectedMonth={this.state.month}/>
                </div>

                <div className="month-bar "> 
                    <div className="row no-gutters">
                        <div className="col-sm"  onClick={() => this.handleClick("jan")}>
                        <Month thisMonth="jan"/> 
                        </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("feb",e)}>
                        <Month  thisMonth="feb"/> 
                        </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("mar",e)}>
                        <Month  thisMonth="mar"/> 
                        </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("apr",e)}>
                        <Month  thisMonth="apr"/> 
                        </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("may",e)}>
                        <Month  thisMonth="may"/> 
                        </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("jun",e)}>
                        <Month  thisMonth="jun"/> 
                        </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("jul",e)}>
                        <Month  thisMonth="jul"/> 
                        </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("aug",e)}>
                        <Month  thisMonth="aug"/> 
                        </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("sep",e)}>
                        <Month  thisMonth="sep"/> 
                        </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("oct",e)}>
                        <Month  thisMonth="oct"/>
                         </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("nov",e)}>
                        <Month  thisMonth="nov"/> 
                         </div>
                        <div className="col-sm"  onClick={(e) => this.handleClick("dec",e)}>
                        <Month  thisMonth="dec"/> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timeline;