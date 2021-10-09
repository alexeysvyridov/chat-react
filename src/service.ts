import axios, { AxiosResponse } from 'axios'
import {MessageInt} from './ModelService/Models'

class ChatService {
   async getAllConversations():Promise<any> {
       try {
           const res = await axios.get<AxiosResponse>(`api/conversations/615db7a8a145e5fafe06387e`)
           if(res.status === 200) {
              return res.data
            }
       } catch (error) {
           console.log(error)
       }
    }
   async getAllMessages():Promise<any> {
       try {
           const res = await axios.get<AxiosResponse>(`api/messages/`)
            return res.data
       } catch (error) {
           console.log(error)
       }
    }
   async getAllUsers():Promise<any> {
       try {
           const res = await axios.get<AxiosResponse>(`api/users/`)
            return res.data
       } catch (error) {
           console.log(error)
       }
    }

}

export default new ChatService();