import { combineReducers } from "redux";

interface InitialState {
    isAuthenticated: boolean,
    user: {}
}

const initialState:InitialState = {
    isAuthenticated: false,
    user: {}
}

const loginReducer = (state=initialState, action:any) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":{
            return {
                ...state,
                isAuthenticated: true
            }
        }
        case "LOGIN_FAILUR":{
            return {
                ...state,
                isAuthenticated: false
            }
        }
        default: return state
    }
}
export const rootReducer = combineReducers({
    loginReducer
})