import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import { getConversationFetch, getConversationsFailur, getConversationsSuccess, getMessagesFuilur, getMessagesSuccess, sendNewMessageSuccess,  } from './components/Home/Chat/redux/conversationActionCreators'
import { loginFailur, LoginFailur, loginSuccess, LoginSuccess, SignOutInt, signOutAction, UserAuth } from './components/Login/redux/loginActionCreators'
import { saveToStorage } from './localStorage'
import {Int_GetMessagesSucces, INT_GetConversationFailur, INT_GetConversationFetch, INT_GetConversationSuccess, Int_GetMessagesFailur, INT_SendNewMessageSuccess} from './ModelService/Models'

export type ActionsConversations = INT_GetConversationSuccess | INT_GetConversationFailur | INT_GetConversationFetch;
export type ActionMessages = Int_GetMessagesSucces | Int_GetMessagesFailur | INT_GetConversationFetch;

interface ServerRespLogin {
    data: ServerData
}
interface ServerData {
    username: string, 
    password: string, 
    _id: string, 
    email: string, 
    img: string, 
    _v?: number
}
class ChatService {
   getAllConversations(id:string):any{
       return async (dispatch:Dispatch<ActionsConversations>) => {
           try {
           const res:AxiosResponse = await axios.get(`api/conversations/${id}`)
            dispatch(getConversationsSuccess(res.data))
        } 
        catch (error) {
           console.log(error)
           dispatch(getConversationsFailur())
        }
        finally {

        }
      }
    }
   getAllMessages(id:string):any {
      return async (dispatch:Dispatch<ActionMessages>) => {
          try {
                dispatch(getConversationFetch(true)) 
                let resp:AxiosResponse =  await axios.get(`api/messages/${id}`)
                dispatch(getMessagesSuccess(resp.data))
            } 
            catch (error) {
                console.log(error)
                dispatch(getMessagesFuilur())
            }finally {
            dispatch(getConversationFetch(false)) 
        }
       }
    }

    sendNewMessage(message:any):any {
        return async (dispatch:Dispatch<INT_SendNewMessageSuccess>) => {
            try {
                let res = await axios.post('/api/messages', message)
                console.log(res)
                dispatch(sendNewMessageSuccess(res.data))
            }
            catch(err) {
                console.log(err)
            }
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
//    async loginAuth(user:UserAuth):Promise<any> {
//        try {
//            const res = await axios.get<AxiosResponse>(`api/users/`)
//             return res.data
//        } catch (error) {
//            console.log(error)
//        }
//     }
   loginAuth(user:UserAuth):any {
       let auth = {
        email:user.username,
        password:user.password
       }
        return async (dispatch: Dispatch<LoginSuccess | LoginFailur>) => {
            try {
                // let res = await axios.request<{email: string, password: string}>({
                //     url: '/api/login', 
                //     transformResponse:(r: any) => r.data,
                //     method: 'post',
                //     data: auth
                // });
                let res = await axios.post('/api/login', auth)
                axios.create({
                    baseURL: 'http://localhost:3000/',
                    headers: {
                        'Authorization': `Bearer ${res?.data?.token}`
                    }
                })

                saveToStorage('auth', {...res.data, isAuthenticated: true})
                dispatch(loginSuccess(user))
            } catch (error) {
                console.log(error)
                dispatch(loginFailur())
            }
        }
    }

   signOutWrapper():any {
        return (dispatch: Dispatch<SignOutInt>) => {
          localStorage.clear()
          dispatch(signOutAction())
        }
    }

}

export default new ChatService();