import React from "react";
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch"
import Home from "./pages/Home"
import Timeline from "./pages/Timeline"
import Root from "./pages/Root"
import TodayQuestion from "./pages/TodayQuestion";
import Universe from "./pages/Universe";
import NavBar from "./pages/NavBar";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            day: 0,
            month: 0,
            year: 0,
            userInfo: {},
            questions: [],
            todayQuestion: "",
            dataRendered: 0,
            dataToRender: 3, // date, user, questions

            // TEMPORARY
            myResponses: [],
            myTodayResponses: [],
            exploreResponses: [],
            //
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
                <div>
                    <NavBar
                        userInfo={this.state.userInfo}
                        logout={this.logout}
                    />
                    <Switch>
                        <Route exact path="/" render={(props) =>
                            <Root
                                {...props}
                                // day={this.state.day}
                                day={25} //HACK FIX
                                month={this.state.month}
                                year={this.state.year}
                                userInfo={this.state.userInfo}
                                questions={this.state.questions}
                                todayQuestion={this.state.todayQuestion}
                            />}
                        />
                        <Route exact path="/t" render={(props) =>
                            <Timeline 
                                {...props}
                                day={this.state.day}
                                month={this.state.month}
                                userInfo={this.state.userInfo}
                                questions={this.state.questions}
                                myResponses={this.state.myResponses}
                                myTodayResponses={this.state.myTodayResponses}
                                exploreResponses={this.state.exploreResponses}
                            />}
                        />
                    </Switch>
                </div>
            );
        } else {
            return null; // TODO make this a loading screen or something
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
            if ((this.state.questions[i].day === this.state.day) && (this.state.questions[i].month === this.state.month)) {
                this.setState({
                    todayQuestion: this.state.questions[i].content
                });
                console.log("question found");
                break;
            }
        }
        if (this.state.todayQuestion === "") {
            this.setState({
                todayQuestion: "Are you ready to answer?"
            });
        }
        console.log(this.state.todayQuestion);
        this.setState({ dataRendered: this.state.dataRendered + 1 });
    }

  
    // CONTENT BELOW IS TEMOPORARY FOR TESTING PURPOSES
    
    // GET all past responses
    getPastResponses = () => {
        fetch('/api/responses?me=true')
            .then(res => res.json())
            .then(
                responses => {
                    this.setState({ myResponses: responses });
                    console.log("past responses retrieved!");
                    console.log(this.state.myResponses);
                } 
            ).then(() => {
                this.getTodayResponses();
            })
    }

    // sort out past responses for today's date
    getTodayResponses = () => {
        const todayResponses = [];
        let i, response;
        for (i=0; i<this.state.myResponses.length; i++) {
            response = this.state.myResponses[i];
            if ((response.day === this.props.day) && (response.month === this.props.month)) {
                todayResponses.push(response);
            }
        }
        // sort todayResponses by descending years
        todayResponses.sort((a, b) => (b.year - a.year));
        this.setState({
            myTodayResponses: todayResponses
        });
        console.log("today's responses retrieved!");
        console.log(this.state.myTodayResponses);
    }

    // GET all public/anonymous for today
    getExploreResponses = () => {
        fetch('/api/responses?day=' + this.props.day + '&month=' + this.props.month + '&year=' + this.props.year)
            .then(res => res.json())
            .then(
                responses => {
                    this.setState({
                        exploreResponses: responses,
                    });
                    console.log("responses retrieved!");
                    console.log(this.state.exploreResponses);
                }
            );
    }

    // adds/edits a personal response
    addMyResponse = (response) => {
        const tempResponses = this.state.myTodayResponses;
        if ((tempResponses.length > 0) && (tempResponses[0].year === this.props.year)) {
            tempResponses[0].content = response.content;
            tempResponses[0].privacy = response.privacy;
        } else {
            tempResponses.unshift(response);
        }
        this.setState({ myTodayResponses: tempResponses });
    }

    // END TEMPORARY

}

export default App;