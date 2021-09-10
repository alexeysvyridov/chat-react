import { LoginFailur, LoginSuccess } from "./loginActionCreators"
import { LOGIN_FAILUR, LOGIN_SUCCESS } from "./loginTypes"

interface InitialState {
    isAuthenticated: boolean,
    user: {}
}

const initialState:InitialState = {
    isAuthenticated: false,
    user: {}
}

type actions = LoginSuccess | LoginFailur
export const loginReducer = (state=initialState, action:actions) => {
    console.log(action)
    switch (action.type) {
        case LOGIN_SUCCESS:{
            return {
                ...state,
                isAuthenticated: true
            }
        }
        case LOGIN_FAILUR:{
            return {
                ...state,
                isAuthenticated: false
            }
        }
        default: return state
    }
}