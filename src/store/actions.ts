import { removeStorageData, setStorageData } from 'main/utils/storage.handler'
import { Meetings } from './types'

export const SET_USER = 'SET_USER'
export const RESET_DATA = 'RESET_DATA'
export const ADD_MEETING = 'ADD_MEETING'

type UserAction = {
    type: typeof SET_USER,
    emailId: string,
}

type AddMeetingAction = {
    type: typeof ADD_MEETING,
    payload: Meetings,
}
type ResetAction = {
    type: typeof RESET_DATA,
}

export function resetData(): ResetAction {
    removeStorageData('localStorage', 'state')
    removeStorageData('sessionStorage', 'sessionUser')
    return {
        type: RESET_DATA,
    }
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
