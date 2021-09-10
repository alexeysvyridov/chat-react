import { combineReducers } from "redux";
import { loginReducer } from "./components/Login/redux/loginReducer";

export const rootReducer = combineReducers({
    loginReducer:loginReducer
})