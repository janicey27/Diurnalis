import React from "react";
import "../../css/home.css";
import "../../css/app.css"

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        document.body.classList.add("home");
    }
    
    componentWillUnmount() {
        document.body.classList.remove("home");
    }

    render() {
        return (
            <div className="center box"> 
                <div className="title">Journal</div>
                <div className="subtitle typewriter">{this.props.todayQuestion}</div>
                <div className="enter">
                    <a className="login" href="/auth/google">Login</a>
                </div>
            </div>
        )
    }

}
