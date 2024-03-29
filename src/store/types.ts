export interface RootState {
    emailId: string;
    meetings: Meetings[];
    groups: Groups[];
}

export interface Meetings {
    date: number;
    location: string;
    name: string;
    id: number;
}

export interface Groups {
    group_id: string;
    name: string;
}
