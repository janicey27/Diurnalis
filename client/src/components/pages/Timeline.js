import React from 'react';
import "../../css/timeline.css";
import Month from "../modules/Month.js"
import Monthline from "../modules/Monthline"

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            month: 0,
            monthLength: 0,
            questionArray: [[1, 1, "This is a question for Jan 1?"], [1, 22, "This is a question for Jan 22?"], [2, 7, "“This is a question for Feb 7?”"]],
            responseArray: [[1, 1, [2018, "“Here’s my response to Jan 1 2018.”"]], [1, 1, [2014, "“Here’s my response to Jan 1 2014!!!!!!.”"]],[1, 22, [2017, "“Here’s my response to Jan 22 2017.”"]], [2, 7, [2018, "“Here’s my response to Feb 7 2018”"]]],
        }
    }

    componentDidMount() {
        this.formatQuestions();
        this.formatResponses();
        this.initializeSocket();
    }

    handleClick(inputMonth, inputLength) {
        this.setState({month: inputMonth})
        this.setState({monthLength: inputLength})
    }

    // format question array for use in timeline
    formatQuestions = () => {
        const questionsArr = [];
        let i, question, oneQuestion;
        for (i=0; i<this.props.questions.length; i++) {
            question = this.props.questions[i];
            oneQuestion = [question.month, question.day, question.content];
            questionsArr.push(oneQuestion);
        }
        this.state.questionArray = questionsArr;
    }

    // format response array for use in timeline
    formatResponses = () => {
        const responsesArr = [];
        let i, response, oneResponse;
        for (i=0; i<this.props.myResponses.length; i++) {
            response = this.props.myResponses[i];
            oneResponse = [response.month, response.day, [response.year, response.content]];
            responsesArr.push(oneResponse);
        }
        this.state.responseArray = responsesArr;
    }
    
    // initialize socket listeners
    initializeSocket = () => {
        // listen for post and add to response array
        this.props.socket.on("post", (response) => {
            if (response.creatorID === this.props.userInfo._id) {
                this.setState(prevState => ({
                    responseArray: prevState.responseArray.concat([[response.month, response.day, [response.year, response.content]]])
                }));
            }
        });

        // listen for edit and edit response array
        this.props.socket.on("edit", (response) => {
            const tempArray = this.state.responseArray;
            if (response.creatorID === this.props.userInfo._id) {
                let i;
                for (i=0; i<tempArray.length; i++) {
                    if ((tempArray[i][0] === response.month) && (tempArray[i][1] === response.day) && (tempArray[i][2][0] === response.year)) {
                        tempArray[i][2][1] = response.content;
                        this.setState({
                            responseArray: tempArray
                        });
                        break;
                    }
                }
            }
        });
    }

    render() {
        return (
            <div className='page-container col-centered'>
            
                <div className="monthline">
                    <Monthline
                        selectedMonth={this.state.month}
                        monthLength={this.state.monthLength}
                        questionArray={this.state.questionArray}
                        responseArray={this.state.responseArray}
                        userInfo={this.props.userInfo}
                        socket={this.props.socket}
                    />
                </div>
                
                <div className="month-bar"> 
                    <div className="row"></div>
                    <div className="col-sm-12 col-centered">
                        <div className="row no-gutters">
                            <div className="col-sm"  onClick={() => this.handleClick(1, 32)}>
                            <Month thisMonth="jan"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(2, 30)}>
                            <Month  thisMonth="feb"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(3, 32)}>
                            <Month  thisMonth="mar"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(4, 31)}>
                            <Month  thisMonth="apr"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(5, 32)}>
                            <Month  thisMonth="may"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(6, 31)}>
                            <Month  thisMonth="jun"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(7, 32)}>
                            <Month  thisMonth="jul"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(8, 32)}>
                            <Month  thisMonth="aug"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(9, 31)}>
                            <Month  thisMonth="sep"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(10, 32)}>
                            <Month  thisMonth="oct"/>
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(11, 31)}>
                            <Month  thisMonth="nov"/> 
                            </div>
                            <div className="col-sm"  onClick={(e) => this.handleClick(12, 32)}>
                            <Month  thisMonth="dec"/> 
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Timeline;