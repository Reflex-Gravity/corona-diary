// app.test.js
import { render, screen, fireEvent } from './test-utils'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'

import App from './App'
import { waitFor } from '@testing-library/react'

test('login to list page rendering', async () => {
    const history = createMemoryHistory()
    const { getByLabelText } = render(
        <Router history={history}>
            <App />
        </Router>
    )
    // verify page content for expected route
    // often you'd use a data-testid or role query, but this is also possible
    await waitFor(() => {
        expect(screen.getByText(/Your Name/i)).toBeInTheDocument()
    })

    // const leftClick = { button: 0 }
    // fireEvent.change(getByLabelText('Email'), { target: { value: 'Jane Doe' } })
    // userEvent.click(screen.getByText('Login').closest('button'), leftClick)

    // await waitFor(() => {
    //     expect(screen.getByText(/Your visits/i)).toBeInTheDocument()
    // })
})
