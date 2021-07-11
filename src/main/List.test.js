import React from 'react'
import { Router } from 'react-router-dom'
import { render, cleanup, screen } from '../test-utils'
import { createMemoryHistory } from 'history'

import List from './List'
afterEach(cleanup)

test('rendering a AddMeeting under route', () => {
    const history = createMemoryHistory()
    const route = '/add-meeting'
    history.push(route)
    render(
        <Router history={history}>
            <List />
        </Router>
    )

    expect(screen.getByText('Your visits')).toBeInTheDocument()
})
