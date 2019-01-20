import React from "react";
import "../../css/home.css";
import "../../css/app.css"

export default class Home extends React.Component {
    
    componentDidMount() {
        document.body.classList.add("home");
    }
    
    componentWillUnmount() {
        document.body.classList.remove("home");
    }

    // GET user
    getUser = () => {
        fetch('/api/whoami')
            .then(res => res.json())
            .then(res => console.log(res));
    }

    render() {
        this.getUser();
        return (
            <div className="center box"> 
                <div className="title">Journal</div>
                <div className="subtitle typewriter">Question preview</div> {/*Query today's question*/}
                <div className="enter">
                    <a className="login" href="/auth/google">Login</a>
                </div>
                <div onClick={this.testFunc}>Test</div>
            </div>
        )
    }

    testFunc = () => {    
      fetch('/api/test')
      .then(console.log("hello"))
    }

}
