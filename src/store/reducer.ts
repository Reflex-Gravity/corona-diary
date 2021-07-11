import { AnyAction } from 'redux'
import { ADD_MEETING, RESET_DATA, SET_USER } from './actions'

import { RootState } from './types'

const initialState: RootState = {
    emailId: '',
    meetings: [],
    groups: [],
}

function reducer(state = initialState, action: AnyAction): RootState {
    switch (action.type) {
        case RESET_DATA: {
            return initialState
        }

        case SET_USER: {
            return {
                ...state,
                emailId: action.emailId,
            }
        }
        case ADD_MEETING: {
            return {
                ...state,
                meetings: [...state.meetings, { ...action.payload }],
            }
        }
    }
    return state
}

export default reducer
