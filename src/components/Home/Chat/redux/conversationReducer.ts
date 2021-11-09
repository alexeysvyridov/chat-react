import {INT_GetConversationFailur, INT_GetConversationSuccess, INT_GetConversationFetch, MessageInt, INT_SendNewMessageSuccess, Int_GetMessagesSucces, Int_GetMessagesFailur, Int_SetCurrentChat} from '../../../../ModelService/Models'
import { GET_CONVERSATIONS_FAILUR, GET_CONVERSATIONS_SUCCESS, GET_CONVERSATION_FETCH, GET_MESSAGES_FAILUR, GET_MESSAGES_SUCCESS, SEND_NEW_MESSAGE_SUCCESS, SET_CURRENT_CHAT } from './conversationTypes'

interface InitialState  {
    conversations: any;
    error: undefined | boolean;
    loading: undefined | boolean;
    currentChat: any,
    messages: MessageInt[] | []
}
const initialState:InitialState = {
    conversations: [],
    error: undefined,
    loading: undefined,
    currentChat: null,
    messages: []
}
type Actions = INT_GetConversationSuccess | INT_GetConversationFailur | INT_GetConversationFetch |INT_SendNewMessageSuccess| Int_GetMessagesSucces | Int_GetMessagesFailur | Int_SetCurrentChat;

export const conversatiosReducer = (state=initialState, action:Actions) => {
    switch(action.type) {
        case GET_CONVERSATION_FETCH: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case GET_CONVERSATIONS_SUCCESS: {
            return {
                ...state,
                conversations: [...action.payload],
                error: false
            }
        }
        case GET_CONVERSATIONS_FAILUR: {
            return {
                ...state,
                error: true,
            }
        }
        case SET_CURRENT_CHAT: {
            return {
                ...state,
                currentChat: action.payload
            }
        }
        case GET_MESSAGES_SUCCESS: {
            return {
                ...state,
                messages: action.payload,
                error: false
            }
        }
        case GET_MESSAGES_FAILUR: {
            return {
                ...state,
                error: true
            }
        }
        case SEND_NEW_MESSAGE_SUCCESS: 
            return {
                ...state,
                messages:[...state.messages, action.payload]
            }
       default: return state
    }
}