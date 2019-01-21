import React from "react";
import "../../css/day.css";

class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showEntry: false
        }
        
    }

    changeShowState = () => {
        console.log("click registered!!")
        this.setState(prevState => ({
            check: !prevState.check
          }));
      };
  
    render() {
        
        const entryComponent = this.state.showEntry ? (<DayEntry/>) : (null);
        
        return (
            
            
            <li className={this.props.activity} onClick={() => this.changeShowState()}>
                <div>
                <time>1934</time> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                </div>
                
            </li>
            
        )
        ;
    }
}

export default Root;