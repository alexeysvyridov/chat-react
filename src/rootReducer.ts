import { combineReducers } from "redux";
import { conversatiosReducer } from "./components/Home/Chat/redux/conversationReducer";
import { loginReducer } from "./components/Login/redux/loginReducer";

export const rootReducer = combineReducers({
    loginReducer:loginReducer,
    conversationReducer: conversatiosReducer
})