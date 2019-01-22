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
                    console.log(questionArr);
                    this.setState({ questions: questionArr });
                    console.log("all questions retrieved!");
                    console.log(this.state.questions);
                }
            ).then(() => {
                this.getTodayQuestion();
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

    render() {
        return (
            <div className = "universe"> 
                <div className = "page explore">
                    <Explore 
                        day={this.state.day} 
                        month={this.state.month} 
                        year={this.state.year}
                    />
                </div>
                <div className = "page today">
                    <TodayQuestion
                        day={this.state.day}
                        month={this.state.month} 
                        year={this.state.year}
                        question={this.state.question}
                    />
                </div>
                <div className = "page timeline">
                    <Timeline questions={this.state.questions}/>
                </div>
            </div>
        )
    }

}

