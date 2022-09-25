import { UserActionReducer } from "../types/types";
import { initialState } from "../context/TemporalUserContext";

const userReducer = (state: any, action: UserActionReducer): any => {
    const { user } = initialState;
    switch (action.type) {
        case "ADD":
            return action.payload;
        case "REMOVE":
            return { user };

        default:
            return {}
    }
}

export default userReducer;