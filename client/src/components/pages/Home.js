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

    login = () => {
        window.location.href="/auth/google";
    }

    render() {
        return (
            <div className="center box"> 
                <div className="title">Diurnalis</div>
                <div className="subtitle">/di.urˈnaː.lis/ <i>noun.</i> a journal, a diary. </div>
                <div className="subtitle typewriter">a universe of sharing and reflecting on daily thoughts.</div>
                <div className="enter">
                    <button className="login" onClick={this.login}>Sign in with Google</button>
                </div>
            </div>
        )
    }

}
