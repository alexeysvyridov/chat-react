import { LOGIN_FAILUR, LOGIN_SUCCESS, SIGN_OUT } from "./loginTypes"

export interface UserAuth {
    username: string,
    password: string,
} 
export interface LoginSuccess {
    type: typeof LOGIN_SUCCESS,
    payload: UserAuth
}
export interface LoginFailur {
    type: typeof LOGIN_FAILUR
}

export const loginSuccess = (user:UserAuth):LoginSuccess => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}
export const loginFailur = ():LoginFailur => {
    return {
        type: LOGIN_FAILUR
    }
}
export interface SignOutInt {
    type: typeof SIGN_OUT
}

export const signOutAction = ():SignOutInt => ({
    type: SIGN_OUT
})