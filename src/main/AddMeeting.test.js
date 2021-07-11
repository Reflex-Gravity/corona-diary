import React from 'react'
import { Route, Router } from 'react-router-dom'
import { render, screen, fireEvent, cleanup, waitFor } from '../test-utils'
import { createMemoryHistory } from 'history'

import AddMeeting from './AddMeeting'
import App from 'App'
afterEach(cleanup)

//testing a controlled component form.
it('Inputing person name updates state', () => {
    const { getByText, getByLabelText } = render(<AddMeeting />)

    expect(getByText(/Person Name/i).textContent).toBe('Person Name')

    fireEvent.change(getByLabelText('Person Name'), { target: { value: 'Jane Doe' } })

    expect(getByText(/Person Name/i).textContent).not.toBe('Jane Doe ')
})

//testing a controlled component form.
// it('Adding person', async () => {
//     const history = createMemoryHistory()
//     history.push('/add-meeting')
//     const { getByText, getByLabelText } = render(
//         <Router history={history}>
//             <App />
//         </Router>
//     )
//     await waitFor(() => {
//         expect(getByText(/Person Name/i).textContent).toBe('Person Name')
//     })

//     fireEvent.change(getByLabelText('Person Name'), { target: { value: 'Jane Doe' } })

//     fireEvent.click(getByText('Add'))
//     await waitFor(() => {
//         expect(getByText(/Your visits/i)).toBeInTheDocument()
//     })
// })
