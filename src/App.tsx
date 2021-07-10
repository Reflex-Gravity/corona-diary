import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import Login from './main/Login'
import store from './store'

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    )
}

export default App
