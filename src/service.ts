import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'react'
import { loginFailur, LoginFailur, loginSuccess, LoginSuccess, SignOutInt, signOutAction, UserAuth } from './components/Login/redux/loginActionCreators'
import { saveToStorage } from './localStorage'
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