
import { INT_GetConversationFailur, ConversationInt, INT_GetConversationSuccess, INT_GetConversationFetch, Int_GetMessagesSucces, MessageInt, Int_GetMessagesFailur } from "../../../../ModelService/Models";
import { GET_CONVERSATIONS_FAILUR, GET_CONVERSATIONS_SUCCESS, GET_CONVERSATION_FETCH, GET_MESSAGES_FAILUR, GET_MESSAGES_SUCCESS, SET_CURRENT_CHAT } from "./conversationTypes";

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
export const setCurrentChat = (chat:any):any => ({
    type: SET_CURRENT_CHAT,
    payload: chat 
})
export const getMessagesSuccess = (messages:MessageInt[]):Int_GetMessagesSucces => ({
    type: GET_MESSAGES_SUCCESS,
    payload: messages 
})

export const getMessagesFuilur = (): Int_GetMessagesFailur => ({
    type: GET_MESSAGES_FAILUR,
})