import React from "react";
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Root from "./pages/Root";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            day: 1,
            month: 1,
            year: 2019,
            userInfo: {},
            questions: [],
            todayQuestion: "",
            dataRendered: 0,
            dataToRender: 2 // date, user, questions
        }
    }

    componentDidMount() {
        this.getDate();
        this.getUser();
        this.getAllQuestions();
    }

    render() {
        if (this.state.dataRendered >= this.state.dataToRender) { // will render when all data are loaded
            return (
                <Route exact path="/" render={(props) =>
                    <Root
                        {...props}
                        day={this.state.day}
                        month={this.state.month}
                        year={this.state.year}
                        userInfo={this.state.userInfo}
                        questions={this.state.questions}
                        todayQuestion={this.state.todayQuestion}
                        logout={this.logout}
                    />}
                />
            );
        } else {
            return null;
        }
    }

    logout = () => {
        this.setState({
            userInfo: null
        })
    };

    getDate = () => {
        const today = new Date();
        this.setState({
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
            dataRendered: this.state.dataRendered + 1
        });
    };

    // get user info
    getUser = () => {    
        fetch('/api/whoami')
            .then(res => res.json())
            .then(
                userObj => {
                    if (userObj._id !== undefined) {
                        this.setState({ 
                            userInfo: userObj
                        });
                    } else {
                        this.setState({ 
                            userInfo: null
                        });
                    }
                    this.setState({ dataRendered: this.state.dataRendered + 1 });
                }
            );
    }

    // get all questions
    getAllQuestions = () => {
        fetch('/api/questions')
            .then(res => res.json())
            .then(
                questionArr => {
                    this.setState({ questions: questionArr });
                }
            ).then(() => {
                this.getTodayQuestion();
            });
    }
    
    // get today's question
    getTodayQuestion = () => {
        let i;
        for (i=0; i<this.state.questions.length; i++) {
            if ((this.state.questions[i].day === this.state.day) && (this.state.questions[i].month === this.state.month)) {
                this.setState({
                    todayQuestion: this.state.questions[i].content
                });
                break;
            }
        }
        if (this.state.todayQuestion === "") {
            this.setState({
                todayQuestion: "Are you ready to answer?"
            });
        }
        this.setState({ dataRendered: this.state.dataRendered + 1 });
    }

}

export default App;