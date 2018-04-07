import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from 'react-redux-firebase';

import logo from './logo.svg';
import './App.css';

class App extends Component {
    static propTypes = {
        firebase: PropTypes.shape().isRequired,
    }

    constructor(props) {
        super(props);
        this.state = { gameId: '', username: '' };
    }

    getGame = (firebase, gameId) =>
        new Promise((resolve) => {
            firebase
                .database()
                .ref('games')
                .orderByChild('id')
                .equalTo(gameId)
                .once('child_added', (snapshot) => {
                    resolve(snapshot);
                });
        });

    joinGame = async () => {
        const { firebase } = this.props;
        const { gameId, username } = this.state;

        const gameSnapShot = await this.getGame(firebase, gameId);

        firebase
            .database()
            .ref(`games/${gameSnapShot.key}/users`)
            .push()
            .set({ username });
    }

    handleInputChange = (event, stateProperty) => {
        this.setState({
            [stateProperty]: event.target.value,
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Spilaðu Imbann!</h1>
                </header>
                <p className="App-intro">
                    <span>Notandanafn</span>
                    <input type="text" value={this.state.username} onChange={(event) => { this.handleInputChange(event, 'username'); }} />
                    <span>Herbergiskóði</span>
                    <input type="text" value={this.state.gameId} onChange={(event) => { this.handleInputChange(event, 'gameId'); }} />
                    <button onClick={this.joinGame}>Spila</button>
                </p>
            </div>
        );
    }
}

export default withFirebase(App);
