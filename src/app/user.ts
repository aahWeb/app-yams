export enum Status {
    Winner,
    Loser,
    Paused
}

export interface User {
    name: string;
    email: string;
    address: string;
    status?: Status
}