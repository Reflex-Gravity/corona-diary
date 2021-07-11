import { ADD_MEETING, RESET_DATA, SET_USER } from './actions'
import reducer from './reducer'
import { initialState } from './reducer'

describe('SET_USER reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toMatchSnapshot()
    })

    it('should reset state with default data', () => {
        expect(
            reducer(initialState, {
                type: RESET_DATA,
            })
        ).toEqual(initialState)
    })

    // SET_USER
    it('should handle SET_USER', () => {
        expect(
            reducer(initialState, {
                type: SET_USER,
                emailId: 'test@gmail.com',
            })
        ).toEqual({ ...initialState, emailId: 'test@gmail.com' })
    })
    it('should handle SET_USER by passing wrong emailId', () => {
        expect(
            reducer(initialState, {
                type: SET_USER,
                emailId: 'test@gmail.com',
            })
        ).not.toEqual({ ...initialState, emailId: 'savior@gmail.com' })
    })

    // ADD_MEETING
    it('should handle ADD_MEETING', () => {
        expect(
            reducer(initialState, {
                type: ADD_MEETING,
                payload: {
                    date: 166224162,
                    location: '61672.123214',
                    name: 'Jane Doe',
                    id: 1635315562,
                },
            })
        ).toEqual({
            ...initialState,
            meetings: [
                {
                    date: 166224162,
                    location: '61672.123214',
                    name: 'Jane Doe',
                    id: 1635315562,
                },
            ],
        })
    })
    it('should handle ADD_MEETING by passing wrong data', () => {
        expect(
            reducer(initialState, {
                type: ADD_MEETING,
                payload: {
                    date: 166224162,
                    location: '61672.123214',
                    name: 'Jane Doe',
                    id: 1635315562,
                },
            })
        ).not.toEqual({
            ...initialState,
            meetings: [
                {
                    date: 166224162,
                    location: '61672.123214',
                    name: 'Teresa',
                    id: 1635315562,
                },
            ],
        })
    })
})
