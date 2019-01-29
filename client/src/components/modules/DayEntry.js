import React from "react";
import PastResponses from "./PastResponses";
import  "../../css/timeline.css";

class Root extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        selectedMonth: 1,
        dayIndex: 0,
        todaysQuestion: "Sorry, the question for this day is currently unavailable.",
        todaysResponses: [],
        hasResponses: false,
        hasSelected: false,
        thisMonth: ""
    }
  }

  // get question for selected day
  getQuestionOfDay = () => {
    const questions = this.props.questionArray;
    let i;
    let gotQuestion = false;
    for (i=0; i<questions.length; i++) {
      if (questions[i][0] === this.state.selectedMonth && questions[i][1] === this.state.dayIndex+1) {
        this.setState({todaysQuestion: questions[i][2]})
        gotQuestion = true;
        break;
      }
    }
    if (gotQuestion == false) {
      this.setState({todaysQuestion: "Sorry, the question for this day is currently unavailable."})
    }
  }

  // get past responses
  getResponsesOfDay = () => {
    const responses = this.props.responseArray;
    var i;
    var hasResponse = false;
    const joined = [];
    for (i=0; i<responses.length; i++) {
      if (responses[i][0] === this.state.selectedMonth && responses[i][1] === this.state.dayIndex+1) {
        joined.push(responses[i][2])
        hasResponse = true;
        this.setState({hasResponses: true})
      }
    }
    this.setState({todaysResponses: joined})
    if (hasResponse == false) {
      this.setState({hasResponses: false})
    }
    
  }

  // get selected month as a string
  getMonth = () => {
      const monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
      let monthStr = monthArr[this.state.selectedMonth-1];
      this.setState({thisMonth: monthStr})
  }

  // initialize
  gettem() {
    this.getQuestionOfDay();
    this.getResponsesOfDay();
    this.getMonth();
  }

  componentDidUpdate(prevProps) {
    // 
    if (this.props.dayIndex != prevProps.dayIndex) { //switching days
        // console.log("component did Update");
        // console.log(this.props.selectedDay);
        // this.updateEntry(this.props.selectedDay);
        // console.log(this.props.dayIndex)
        this.setState({hasSelected: true});
        this.setState((prevState, props) => ({dayIndex: props.dayIndex}), this.gettem);
        this.setState({todaysResponses: []});
        
        
    }
    else if (this.props.selectedMonth !=prevProps.selectedMonth) { //switching months
      this.setState({hasSelected: true});
      this.setState({todaysResponses: []});
      this.setState({dayIndex: 0})
      this.setState((prevState, props) => ({selectedMonth: props.selectedMonth}), this.gettem);

    }

}

  render() {
    // create components
    const questionComponent = this.state.hasResponses ? (this.state.todaysQuestion) : ("This question is hidden.");
    const today = this.state.dayIndex+1;
    const responseComponent = this.state.hasResponses ? (<PastResponses responses={this.state.todaysResponses}/>) : ("Log in on " + this.state.thisMonth + " " + today + " to reveal this question and enter your response!");
    if (this.state.hasSelected == false) {
      return (
        <div className="selectText"><h2>Please select a month to view your past responses.</h2></div>
      )
    }
    else {
      return (
        <div className="text-container">
          {/* display selected date */}
          <h4>{this.state.thisMonth} {today}</h4>{/*<TodayDate this.state.dayIndex+1} month={this.state.selectedMonth} />*/}
          {/* display question */}
          <h2>{questionComponent}</h2>
          {/* display past responses */}
          <div className="responses-cont">{responseComponent}</div>
        </div>
      );
    }
  }
}

export default Root;