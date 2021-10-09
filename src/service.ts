import axios, { Axios, AxiosResponse } from 'axios'
import { Conversation, UserInt } from './ModelService/Models'


class ChatService {
    constructor() { }
   async getAllConversations() {
       try {
           const res = await axios.get<AxiosResponse>(`api/conversations/615db7a8a145e5fafe06387e`)
           if(res.status === 200) {
              return res.data
            }
       } catch (error) {
           console.log(error)
       }
    }
   async getAllUsers() {
       try {
           const res = await axios.get<AxiosResponse>(`api/users/`)
          if(res.status === 200) {
              return res.data
            }
       } catch (error) {
           console.log(error)
       }
    }

}

export default new ChatService;