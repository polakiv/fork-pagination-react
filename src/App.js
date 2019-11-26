import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, withRouter } from "react-router-dom";
 
import UsersContainer from "./components/Users/UsersContainer";   

 
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";
 



class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'> 
                <div className='app-wrapper-content'>  
                    <Route exact path='/'
                        render={() => <UsersContainer />} />  
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);

const WikiripJSApp = (props) => {
    return <HashRouter >
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </HashRouter>
}

export default WikiripJSApp;
