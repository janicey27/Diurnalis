import React from "react";
import "../app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch"
import Root from "./pages/Root"

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Root} />
        </Switch>
      </div>
    )
    ;
  }
}

export default App;