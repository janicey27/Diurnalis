import React from "react";

class Root extends React.Component {
  
  componentDidMount() {
    console.log("day entry mounted!")
  }

  render() {
    return (
      <div className = "entry-container">
        <h2> This the question of this day?</h2>
        <p>2017. I love blahlah lah lah lsdf web lab.</p>
      </div>
    )
    ;
  }
}

export default Root;