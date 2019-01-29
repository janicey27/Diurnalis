import React from "react";
import  "../../css/timeline.css";

class Root extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        
        <div>
            {Array.from(Array(this.props.responses.length).keys()).map(y => (
               <div key={y}> <b>{this.props.responses[y][0]}</b> &nbsp; | &nbsp; {this.props.responses[y][1]} </div>
            ))} 

        </div>
    )
  }
}

export default Root;