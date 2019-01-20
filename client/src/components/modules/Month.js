import React from "react";
import "../../css/month.css"

class Month extends React.Component {
  render() {
    return (
      
      <div className={"image " + this.props.thisMonth }/>
       
    )
    ;
  }
}

export default Month;