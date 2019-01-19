import React from "react";
import "../../css/home.css";
import "../../css/app.css"

export default class Home extends React.Component {
    render() {
        return (
            <div className="center box"> 
                <div className="title">Journal</div>
                <div className="subtitle typewriter">Question preview</div>
                <div className="enter">
                    <a className="login" href="/auth/google">Login</a>
                </div>
            </div>
        )
    }
}
