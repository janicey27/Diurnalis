import React from "react";
import Home from "./Home";
import Universe from "./Universe";

class Root extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (this.props.userInfo !== null ?
      <Universe {...this.props} /> :
      <Home {...this.props} />
    )
  }
}

/*
                                day={this.state.day}
                                month={this.state.month}
                                year={this.state.year}
                                userInfo={this.state.userInfo}
                                questions={this.state.questions}
                                todayQuestion={this.state.todayQuestion}
*/
export default Root;