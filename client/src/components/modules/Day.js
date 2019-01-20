import React from "react";
import "../../css/day.css";

class Root extends React.Component {

    constructor(props) {
        super(props);

        
    }
  
    render() {
        return (
            <li className={this.props.activity}>
                <div>
                <time>1934</time> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                </div>
            </li>
        )
        ;
    }
}

export default Root;