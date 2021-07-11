// app.test.js
import { render, screen } from './test-utils'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'

import App from './App'
import { waitFor } from '@testing-library/react'

test('login page rendering', async () => {
    const history = createMemoryHistory()
    render(
        <Router history={history}>
            <App />
        </Router>
    )

    await waitFor(() => {
        expect(screen.getByText(/Your Name/i)).toBeInTheDocument()
    })
})
