import { GET_CONVERSATIONS_FAILUR, GET_CONVERSATIONS_SUCCESS, GET_CONVERSATION_FETCH, GET_MESSAGES_FAILUR, GET_MESSAGES_SUCCESS } from "../components/Home/Chat/redux/conversationTypes";

export interface ConversationInt {
    createdAt: string;
    members: Array<string>;
    updatedAt: string;
    __v?: number;
    _id:string;
    img?: string;
    username: string;
}
export type INT_GetConversationSuccess = {
    type: typeof GET_CONVERSATIONS_SUCCESS,
    payload: ConversationInt[]
}
export type INT_GetConversationFailur = {
    type: typeof GET_CONVERSATIONS_FAILUR
}
export interface INT_GetConversationFetch {
   type: typeof GET_CONVERSATION_FETCH
}
export interface UserInt {
    desc: string;
    img: string
    isAdmin: boolean;
    _id:string;
    username: string;
    password: string,
}

export interface MessageInt {
    _id: string;
    conversationId:string;
    sender: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    __v?:number;
}

export type Int_GetMessagesSucces = {
    type: typeof GET_MESSAGES_SUCCESS,
    payload: MessageInt[]
}
export type Int_GetMessagesFailur = {
    type: typeof GET_MESSAGES_FAILUR,
}