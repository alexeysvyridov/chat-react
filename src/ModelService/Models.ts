export interface ConversationInt {
    _id:string;
    members: [];
    createdAt: string;
    updatedAt: string;

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