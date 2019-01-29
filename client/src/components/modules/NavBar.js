import React, { Component } from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar">
                <div className="navbar-brand">Diurnalis</div>
                <div className="navbar-nav">
                        { this.props.userInfo === null ? (
                            <a className="nav-item nav-link" href="/auth/google">Login</a>
                        ) : (
                            <React.Fragment>
                                <a className="nav-item nav-link" href="/logout" onClick={this.props.logout}>Logout <i class="fas fa-sign-out-alt"></i></a>
                            </React.Fragment>
                        )}
                </div>
            </nav>
        );
    }
}

export default NavBar;