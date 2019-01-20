import React from "react";
import "../../css/month.css"

class Month extends React.Component {
  render() {
    return (
      <div>

        <div className={"image " + this.props.thisMonth }/>
        <div className="label">{this.props.thisMonth}</div>

      </div>
       
    )
    ;
  }
}

export default Month;