import React from "react";
import Home from "./Home";
import Universe from "./Universe";

class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            myResponses: [],
            myTodayResponses: [],
            exploreResponses: [],
            dataRendered: 0,
            dataToRender: 2 // past responses, explore responses
        });
    }

    componentDidMount() {
        this.getPastResponses();
        this.getExploreResponses();
    }

    render() {
        return (this.props.userInfo !== null
            ? ((this.state.dataRendered >= this.state.dataToRender) ? <Universe {...this.props} myResponses={this.state.myResponses} myTodayResponses={this.state.myTodayResponses} exploreResponses={this.state.exploreResponses} addMyResponse={this.addMyResponse} logout={this.props.logout} /> : null)
            : <Home {...this.props} />
        )
    }

    // GET all past responses
    getPastResponses = () => {
        fetch('/api/responses?me=true')
            .then(res => res.json())
            .then(
                responses => {
                    this.setState({ myResponses: responses });
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
            myTodayResponses: todayResponses,
            dataRendered: this.state.dataRendered + 1
        });
    }

    // GET all public/anonymous for today
    getExploreResponses = () => {
        fetch('/api/responses?day=' + this.props.day + '&month=' + this.props.month + '&year=' + this.props.year)
            .then(res => res.json())
            .then(
                responses => {
                    this.setState({
                        exploreResponses: responses,
                        dataRendered: this.state.dataRendered + 1
                    });
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
        this.setState({
            myTodayResponses: tempResponses
        });
    }

}

export default Root;