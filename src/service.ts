import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import { getConversationsFailur, getConversationsSuccess } from './components/Home/Chat/redux/conversationActionCreators'
import { loginFailur, LoginFailur, loginSuccess, LoginSuccess, SignOutInt, signOutAction, UserAuth } from './components/Login/redux/loginActionCreators'
import { saveToStorage } from './localStorage'
import {INT_GetConversationFailur, INT_GetConversationFetch, INT_GetConversationSuccess} from './ModelService/Models'

export type ActionsConversations = INT_GetConversationSuccess | INT_GetConversationFailur | INT_GetConversationFetch;

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
   async getAllMessages():Promise<any> {
       try {
            await axios.get<AxiosResponse>(`api/messages/`)
            
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
//    async loginAuth(user:UserAuth):Promise<any> {
//        try {
//            const res = await axios.get<AxiosResponse>(`api/users/`)
//             return res.data
//        } catch (error) {
//            console.log(error)
//        }
//     }
   loginAuth(user:UserAuth):any {
        return async (dispatch: Dispatch<LoginSuccess | LoginFailur>) => {
            try {
                saveToStorage('auth', {...user, isAuthenticated: true})
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