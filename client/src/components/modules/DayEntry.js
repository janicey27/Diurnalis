import React from "react";

class Root extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        selectedMonth: this.props.selectedMonth,
        mockEntries: ["active","inactive","inactive","active","active","active","active","inactive","inactive","active","active","inactive","inactive","active","inactive","active","active","inactive","inactive","active","active","inactive","inactive","active","inactive","active","active","inactive","inactive","active","inactive"] ,
        dayIndex: 0
    }

}

  componentDidMount() {
    console.log("day entry mounted!")
  }

  updateEntry(inputDay) {
    console.log("update function fired!!")
    this.setState({dayIndex: inputDay});
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedDay != prevProps.selectedDay) {
        console.log("component did Update");
        console.log(this.props.selectedDay);
        this.updateEntry(this.props.selectedDay);
    }
}

  render() {
    return (
      <div className = "entry-container">
        <h2> This the question of this day?</h2>
        <p>{this.state.dayIndex}</p>
      </div>
    )
    ;
  }
}

export default Root;