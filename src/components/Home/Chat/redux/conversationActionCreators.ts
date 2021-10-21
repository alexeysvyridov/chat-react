import { INT_GetConversationFailur, ConversationInt, INT_GetConversationSuccess, INT_GetConversationFetch } from "../../../../ModelService/Models";
import { GET_CONVERSATIONS_FAILUR, GET_CONVERSATIONS_SUCCESS, GET_CONVERSATION_FETCH } from "./conversationTypes";

export const getConversationsSuccess = (conversations:ConversationInt[]):INT_GetConversationSuccess => ({
    type: GET_CONVERSATIONS_SUCCESS,
    payload: conversations
})

export const getConversationsFailur = ():INT_GetConversationFailur => ({
    type: GET_CONVERSATIONS_FAILUR
})
export const getConversationFetch = ():INT_GetConversationFetch => ({
    type: GET_CONVERSATION_FETCH
})