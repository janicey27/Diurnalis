import React from "react";
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch"
import Home from "./pages/Home"
import Timeline from "./pages/Timeline"
import Root from "./pages/Root"
import TodayQuestion from "./pages/TodayQuestion";
import Universe from "./pages/Universe";
import NavBar from "./pages/NavBar";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userInfo: null,
    }
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div>
        <NavBar
          userInfo={this.state.userInfo}
          logout={this.logout}
        />
        <Switch>
          <Route exact path="/" render={(props) => <Root {...props} userInfo={this.state.userInfo} questions={this.state.questions}/>}/>
          <Route exact path="/q" component={TodayQuestion}/>
          <Route exact path="/t" component={Timeline}/>
          <Route exact path='/u' component={Universe}/>
        </Switch>
      </div>
    );
  }

  logout = () => {
      this.setState({
          userInfo: null
      })
  };

  getUser = () => {    
      fetch('/api/whoami')
      .then(res => res.json())
      .then(
          userObj => {
              if (userObj._id !== undefined) {
                  this.setState({ 
                      userInfo: userObj
                  });
              } else {
                  this.setState({ 
                      userInfo: null
                  });
              }
          }
      );
    }

  // get all questions
  getAllQuestions = () => {
      fetch('/api/questions')
          .then(res => res.json())
          .then(
              questions => {
                  console.log(questions);
                  this.setState({ questions: questions });
                  console.log("all questions retrieved!");
                  console.log(this.state.questions);
              }
          );
  }

}

export default App;