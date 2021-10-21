import {INT_GetConversationFailur, ConversationInt, INT_GetConversationSuccess, INT_GetConversationFetch} from '../../../../ModelService/Models'
import { GET_CONVERSATIONS_FAILUR, GET_CONVERSATIONS_SUCCESS, GET_CONVERSATION_FETCH } from './conversationTypes'

interface InitialState  {
    conversations: Array<any>;
    error: undefined | boolean;
    loading: undefined | boolean;
}
const initialState:InitialState = {
    conversations: [],
    error: undefined,
    loading: undefined
}
type Actions = INT_GetConversationSuccess | INT_GetConversationFailur | INT_GetConversationFetch;

export const conversatiosReducer = (state=initialState, action:Actions) => {
    switch(action.type) {
        case GET_CONVERSATION_FETCH: {
            return {
                ...state,
                loading: true
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
       default: return state
    }
}