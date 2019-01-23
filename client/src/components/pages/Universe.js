import React from "react";
import "../../css/app.css";
import Timeline from "./Timeline";
import TodayQuestion from "./TodayQuestion";
import Explore from "./Explore";

export default class Universe extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            day: 22,
            month: 1,
            year: 2019,
            questions: [],
            question: '',
            toRender: false,
            responded: false,
        }
    }

    componentDidMount() {
        this.getAllQuestions();
    }

    // get all questions
    getAllQuestions = () => {
        fetch('/api/questions')
            .then(res => res.json())
            .then(
                questionArr => {
                    this.setState({ questions: questionArr });
                    console.log("all questions retrieved!");
                    console.log(this.state.questions);
                }
            ).then(() => {
                this.getTodayQuestion();
            }).then(() => {
                this.setState({ toRender: true })
            });
    }
    
    // get today's question
    getTodayQuestion = () => {
        let i;
        for (i=0; i<this.state.questions.length; i++) {
            if((this.state.questions[i].day===this.state.day)&&(this.state.questions[i].month===this.state.month)){
                this.setState({
                    question: this.state.questions[i].content
                })
                console.log("question found")
                console.log(this.state.question)
                break;
            }
        }
    }

    updateResponded = () => {
        this.setState({
            responded: true,
        })
    }

    render() {
        
        var timeline = this.state.responded ? (<a href="#timeline" className = "timeline-btn">Timeline</a>):(null)
        var explore = this.state.responded ? (<a href="#explore" className = "explore-btn">Explore</a>):(null)

        if (this.state.toRender) {
            return (
                <div className = "universe"> 
                    <div className = "page explore" id="explore">
                        <Explore 
                            day={this.state.day} 
                            month={this.state.month} 
                            year={this.state.year}
                            question={this.state.question}
                        />
                    </div>
                    <div className = "page today" id="today">
                        {explore}
                        <TodayQuestion
                            day={this.state.day}
                            month={this.state.month} 
                            year={this.state.year}
                            question={this.state.question}
                            updateResponded={this.updateResponded}
                        />
                        {timeline}
                    </div>
                    <div className = "page timeline" id="timeline">
                        {explore}
                        <Timeline questions={this.state.questions}/>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

