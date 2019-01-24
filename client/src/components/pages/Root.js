import React from "react";
import Home from "./Home";
import Universe from "./Universe";

class Root extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (this.props.userInfo !== null ?
            <Universe {...this.props} /> :
            <Home {...this.props} />
        )
    }

}

export default Root;