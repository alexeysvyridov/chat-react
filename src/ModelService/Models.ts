export interface Conversation {
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