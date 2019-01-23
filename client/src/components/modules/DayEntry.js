import React from "react";
import PastResponses from "./PastResponses";

class Root extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        selectedMonth: 2, //later change this to default to today!!!!
        dayIndex: 6,
        todaysQuestion: "Sorry, the question for this day is currently unavailable.",
        todaysResponses: [],
        hasResponses: false,
        hasSelected: false
    }

}
  getQuestionOfDay = () => {
    const questions = this.props.questionArray;
    var i;
    var gotQuestion = false;
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

  componentDidMount() {
    // console.log("day entry mounted!")
    // this.setState({selectedMonth: 2})
    // this.setState({dayIndex: 6});
    // this.setState({})
  }

  gettem() {
    this.getQuestionOfDay();
    this.getResponsesOfDay();
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
    
    var responseComponent = this.state.hasResponses ? (<PastResponses responses={this.state.todaysResponses}/>) : ("You have no entries for this question!");
    if (this.state.hasSelected == false) {
      return (
        <div><h1>Please select a month to view your past responses.</h1></div>
      )
    }
    else {
      return (
        <div className = "entry-container">
          <h4>Selected date: {this.state.selectedMonth}/{this.state.dayIndex+1} </h4>
        
          <h2>{this.state.todaysQuestion}</h2>
  
          <div>{responseComponent}</div>
          
          
        </div>
      );
    }
  }
}

export default Root;