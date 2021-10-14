import { LoginFailur, LoginSuccess, SignOutInt } from "./loginActionCreators"
import { LOGIN_FAILUR, LOGIN_SUCCESS, SIGN_OUT } from "./loginTypes"

interface InitialState {
    isAuthenticated: boolean,
    user: {}
}

const initialState:InitialState = {
    isAuthenticated: false,
    user: {}
}

type actions = LoginSuccess | LoginFailur | SignOutInt
export const loginReducer = (state=initialState, action:actions) => {
    switch (action.type) {
        case LOGIN_SUCCESS:{
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        }
        case LOGIN_FAILUR:{
            return {
                ...state,
                isAuthenticated: false
            }
        }
        case SIGN_OUT:{
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }
        }
        default: return state
    }
}