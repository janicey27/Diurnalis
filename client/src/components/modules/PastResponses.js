import React from "react";
import  "../../css/timeline.css";

class Root extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const responseArr = this.props.responses;
        responseArr.sort((a, b) => (b[0] - a[0]));
        return (
            <div>
                {Array.from(Array(responseArr.length).keys()).map(y => (
                  <div key={y}> <b>{responseArr[y][0]}</b> &nbsp; | &nbsp; {responseArr[y][1]} </div>
                ))}
            </div>
        )
    }

}

export default Root;