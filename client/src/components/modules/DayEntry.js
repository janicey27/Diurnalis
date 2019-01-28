import React from "react";
import PastResponses from "./PastResponses";
import  "../../css/timeline.css";
import TodayDate from "../pages/TodayDate";
import AnimateOnChange from 'react-animate-on-change'




class Root extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        selectedMonth: 2, //later change this to default to today!!!!
        dayIndex: 6,
        todaysQuestion: "Sorry, the question for this day is currently unavailable.",
        todaysResponses: [],
        hasResponses: false,
        hasSelected: false,
        thisMonth: ""
    }

}
  getQuestionOfDay = () => {
    const questions = this.props.questionArray;
    let i;
    let gotQuestion = false;
    for (i=0; i<questions.length; i++) {
      if (questions[i][0] === this.state.selectedMonth && questions[i][1] === this.state.dayIndex+1) {
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
      if (responses[i][0] === this.state.selectedMonth && responses[i][1] === this.state.dayIndex+1) {
        var joined = this.state.todaysResponses
        joined.push(responses[i][2])
        this.setState({todaysResponses: joined})
        hasResponse = true;
        this.setState({hasResponses: true})
      }
    }
    if (hasResponse == false) {
      this.setState({hasResponses: false})
    }
    
  }

  getMonth = () => {
      const monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
      let monthStr = monthArr[this.state.selectedMonth-1];
      this.setState({thisMonth: monthStr})
  }

  componentDidMount() {
    // console.log("day entry mounted!")
    // this.setState({selectedMonth: 2})
    // this.setState({dayIndex: 6});
    // this.setState({})
  }

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
    
    var questionComponent = this.state.hasResponses ? (this.state.todaysQuestion) : ("This question is hidden.");
    const today = this.state.dayIndex+1;
    var responseComponent = this.state.hasResponses ? (<PastResponses responses={this.state.todaysResponses}/>) : ("Log in on " + this.state.thisMonth + " " + today + " to reveal this question and enter your response!");
    if (this.state.hasSelected == false) {
      return (
        <div className="selectText"><h2>Please select a month to view your past responses.</h2></div>
      )
    }
    else {
      return (
        <div className="text-container">
          

          <h4>{this.state.thisMonth} {this.state.dayIndex+1} </h4>
        
          <h2>{questionComponent}</h2>
  
          <div className="responses-cont">{responseComponent}</div>
          
          
        </div>
      );
    }
  }
}

export default Root;