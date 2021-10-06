import axios, { Axios } from 'axios'

interface Conversation {
    _id:string;
    members: [];
    createdAt: string;
    updatedAt: string;

}
class ChatService {
    constructor() {
    }
   async getAllConversations() {
       try {
           const res = await axios.get<Conversation>(`/conversations/${'6145d965a5128731d4ff84c4'}`)
           console.log(res)
       } catch (error) {
           console.log(error)
       }
    }

}

export default new ChatService;