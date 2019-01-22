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

const reader = new FileReader();
reader.onload = (e) => {
    this.state.questions = reader.result;
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userInfo: null,
      questions: null,
    }
  }

  componentDidMount() {
    this.getUser();
    this.getAllQuestions();
  }

  render() {
    return (
      <div>
        <NavBar
          userInfo={this.state.userInfo}
          logout={this.logout}
        />
        <Switch>
          <Route exact path="/" render={(props) => <Root {...props} userInfo={this.state.userInfo} />}/>
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
        

    /*
    reader.readAsText('/public/questions.json');
    console.log("questions retrieved!");
    console.log(this.state.questions);
    */

    /*
    fs.readFile('/public/questions.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            questions = data;
        }
    });
    */
  }

}

export default App;