import { Meetings } from './types'

export const SET_USER = 'SET_USER'
export const ADD_MEETING = 'ADD_MEETING'

type UserAction = {
    type: typeof SET_USER,
    emailId: string,
}

type AddMeetingAction = {
    type: typeof ADD_MEETING,
    payload: Meetings,
}

export function setUser(emailId: string): UserAction {
    return {
        type: SET_USER,
        emailId,
    }
}

export function addMeeting(payload: Meetings): AddMeetingAction {
    return {
        type: ADD_MEETING,
        payload,
    }
}
