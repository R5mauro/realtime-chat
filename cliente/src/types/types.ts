import { DocumentData } from "firebase/firestore";

export interface Message {
    body: string,
    from: User
}
export interface FirebaseMessage {
    content: DocumentData,
    id: string
}

export interface User {
    name: string,
    id: string
}

export interface UserActionReducer {
    payload: any,
    type: "ADD" | "REMOVE";
}

export interface TemporalUserContextType {
    user: User
    dispatch: React.Dispatch<UserActionReducer>
}