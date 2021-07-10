import { AnyAction } from 'redux'
import { SET_USER } from './actions'

import { RootState } from './types'

const initialState: RootState = {
    emailId: '',
    meetings: [],
    groups: [],
}

function reducer(state = initialState, action: AnyAction): RootState {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                emailId: action.emailId,
            }
        }
    }
    return state
}

export default reducer
