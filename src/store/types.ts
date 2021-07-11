export interface RootState {
    emailId: string;
    meetings: Meetings[];
    groups: Groups[];
}

export interface Meetings {
    date: Date;
    location: string;
    name: string;
    group_id: number;
}

export interface Groups {
    group_id: string;
    name: string;
}
