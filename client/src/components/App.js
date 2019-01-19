import React from "react";
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch"
import Home from "./pages/Home";
import TodayQuestion from "./pages/TodayQuestion";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/q" component={TodayQuestion}/>
        </Switch>
      </div>
    );
  }
}

export default App;