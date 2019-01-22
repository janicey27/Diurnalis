import React from "react";
import "../../css/timeline.css";

class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //key: this.props.key
        }
        
    }

    componentDidMount() {
       // console.log(this.props.key)
    }
  
    render() {
        
        
        
        return (
            
            
            <li className={this.props.activity} onClick={() => this.props.entryFunction(this.props.dayIndex)}>
                
                
            </li>
            
        )
        ;
    }
}

export default Root;