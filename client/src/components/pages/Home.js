import React from "react";
import "../css/home.css";
import Link from "react-router-dom/es/Link";

export default class Home extends React.Component {
    render() {
        <div className ="center">
            <div className="title">Journal</div>
            <div className="subtitle">Question preview</div>
            <div className="enter">
                <a className="login" href="/auth/google">Login</a>
            </div>
        </div>
    }
}