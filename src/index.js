import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';

import App from './App';
import './index.css';
import { firebaseConfig } from './config/firebase';

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase),
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
});

const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
