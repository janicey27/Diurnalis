import React from "react";

class Root extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        // selectedMonth: this.props.selectedMonth,
        // dayIndex: 0
        todaysQuestion: "Sorry, the question for this day is currently unavailable.",
        todaysResponses: "You have no entries for this question!"
    }

}
  getQuestionOfDay = () => {
    const questions = this.props.questionArray;
    var i;
    var gotQuestion = false;
    for (i=0; i<questions.length; i++) {
      if (questions[i][0] === this.props.selectedMonth && questions[i][1] === this.props.dayIndex+1) {
        this.setState({todaysQuestion: questions[i][2]})
        gotQuestion = true;
      }
    }
    // console.log(gotQuestion)
    if (gotQuestion == false) {
      this.setState({todaysQuestion: "Sorry, the question for this day is currently unavailable."})
    }
  }

  getResponsesOfDay = () => {
    const responses = this.props.responseArray;
    var i;
    var hasResponse = false;
    for (i=0; i<responses.length; i++) {
      if (responses[i][0] === this.props.selectedMonth && responses[i][1] === this.props.dayIndex+1) {
        this.setState({todaysResponses: responses[i][3]})
        hasResponse = true;
      }
    }
    if (hasResponse == false) {
      this.setState({todaysResponses: "You have no entries for this question!"})
    }
  }

  componentDidMount() {
    // console.log("day entry mounted!")
    
  }

  updateEntry(inputDay) {
    // console.log("update function fired!!")
    // this.setState({dayIndex: inputDay});
  }

  componentDidUpdate(prevProps) {
    if (this.props.dayIndex != prevProps.dayIndex) {
        // console.log("component did Update");
        // console.log(this.props.selectedDay);
        // this.updateEntry(this.props.selectedDay);
        this.getQuestionOfDay();
        this.getResponsesOfDay();
    }
}

  render() {
    return (
      <div className = "entry-container">
        <h4>Selected date: {this.props.selectedMonth}/{this.props.dayIndex+1} </h4>
        <h2>{this.state.todaysQuestion}</h2>
        <p>{this.state.todaysResponses}</p>
        
      </div>
    )
    ;
  }
}

export default Root;