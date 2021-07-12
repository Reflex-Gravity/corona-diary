import React, { lazy } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './store'
import WrappedSuspense from './main/components/WrappedSuspense'
import { Container } from '@material-ui/core'

import './index.css'

const List = lazy(() => import('./main/List'))
const Login = lazy(() => import('./main/Login'))
const AddMeeting = lazy(() => import('./main/AddMeeting'))

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <WrappedSuspense>
                <Container className="main-container" maxWidth="md">
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Login />
                            </Route>
                            <Route exact path="/list">
                                <List />
                            </Route>
                            <Route exact path="/add-meeting">
                                <AddMeeting />
                            </Route>
                        </Switch>
                    </Router>
                </Container>
            </WrappedSuspense>
        </Provider>
    )
}

export default App
