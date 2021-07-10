export const SET_USER = 'SET_USER'

type UserAction = {
    type: typeof SET_USER,
    emailId: string,
}

export function setUser(emailId: string): UserAction {
    return {
        type: SET_USER,
        emailId,
    }
}
