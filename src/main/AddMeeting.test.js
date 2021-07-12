import React from 'react'

import { render, fireEvent, cleanup } from '../test-utils'

import AddMeeting from './AddMeeting'

afterEach(cleanup)

//testing a controlled component form.
it('Inputing person name updates state', () => {
    const { getByText, getByLabelText } = render(<AddMeeting />)

    expect(getByText(/Person Name/i).textContent).toBe('Person Name')

    fireEvent.change(getByLabelText('Person Name'), { target: { value: 'Jane Doe' } })

    expect(getByText(/Person Name/i).textContent).not.toBe('Jane Doe ')
})
