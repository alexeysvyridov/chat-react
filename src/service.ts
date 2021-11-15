import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import { getConversationFetch, getConversationsFailur, getConversationsSuccess, getMessagesFuilur, getMessagesSuccess, sendNewMessageSuccess,  } from './components/Home/Chat/redux/conversationActionCreators'
import { loginFailur, LoginFailur, loginSuccess, LoginSuccess, SignOutInt, signOutAction, UserAuth } from './components/Login/redux/loginActionCreators'
import StorageHelper from './localStorage'
import {Int_GetMessagesSucces, INT_GetConversationFailur, INT_GetConversationFetch, INT_GetConversationSuccess, Int_GetMessagesFailur, INT_SendNewMessageSuccess} from './ModelService/Models'
import ApiClient, { IApiClient } from './ApiClient'

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

interface IChatService {
    getAllConversations:(id: string) => Promise<any>;
    getAllMessages: (id: string) => void;
    sendNewMessage:(id: string) => Promise<any>;
    getAllUsers: (message: any) => Promise<any>;
    loginAuth: (user:UserAuth) => Promise<any>;
    signOutWrapper: () => void;
}

class ChatService implements IChatService{
   private apiClient: IApiClient;

   constructor(ApiClient:any) {
       this.apiClient = new ApiClient()
   }

   public getAllConversations(id:string):any{
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

   public getAllMessages(id:string):any {
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

    public sendNewMessage(message:any):any {
        return async (dispatch:Dispatch<INT_SendNewMessageSuccess>) => {
            try {
                let res:AxiosResponse = await axios.post('/api/messages', message)
                dispatch(sendNewMessageSuccess(res.data))
            }
            catch(err) {
                console.log(err)
            }
        }
    } 

  public async getAllUsers():Promise<any> {
       try {
           const res:AxiosResponse = await axios.get(`api/users/`)
            return res.data
       } catch (error) {
           console.log(error)
       }
    }

//    private setToken(accessToken:string) {
//         // this.apiClient = new this.apiClient(accessToken)
//         console.log(this.apiClient)
//    } 
   
   public loginAuth(user:UserAuth):any {
       let auth = {
        email:user.username,
        password:user.password
       }
        return async (dispatch: Dispatch<LoginSuccess | LoginFailur>) => {
            try {
                let res = await axios.post<any>('/api/login', auth);
                axios.interceptors.request.use(config => {
                   config.headers && ( config.headers["Authorization"] = `Bearer ${res.data.token}`)
                    return config
                })
                StorageHelper.saveToStorage('auth', {...res.data, isAuthenticated: true})
                dispatch(loginSuccess(user))
            } catch (error) {
                console.log(error)
                dispatch(loginFailur())
            }
        }
    }

   public signOutWrapper():any {
        return (dispatch: Dispatch<SignOutInt>) => {
          localStorage.clear()
          dispatch(signOutAction())
        }
    }

}

export default new ChatService(ApiClient);