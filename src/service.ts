import axios, { AxiosResponse } from 'axios'
import { UserAuth } from './components/Login/redux/loginActionCreators'
import {MessageInt} from './ModelService/Models'

class ChatService {
   async getAllConversations(id:string):Promise<any> {
       try {
           const res = await axios.get<AxiosResponse>(`api/conversations/${id}`)
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
   async loginAuth(user:UserAuth):Promise<any> {
       try {
           const res = await axios.get<AxiosResponse>(`api/users/`)
            return res.data
       } catch (error) {
           console.log(error)
       }
    }

}

export default new ChatService();