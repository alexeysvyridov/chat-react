import { LOGIN_FAILUR, LOGIN_SUCCESS } from "./loginTypes"

export interface LoginSuccess {
    type: typeof LOGIN_SUCCESS
}
export interface LoginFailur {
    type: typeof LOGIN_FAILUR
}

export const loginSuccess = ():LoginSuccess => {
    return {
        type: LOGIN_SUCCESS
    }
}
export const loginFailur = ():LoginFailur => {
    return {
        type: LOGIN_FAILUR
    }
}