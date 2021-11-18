import axios from 'axios';
import { memo, useEffect, useState } from 'react'
import { useTypeDispatch } from '../../../hooks/useTypeDispatch';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ConversationInt, UserInt } from '../../../ModelService/Models';
import chatService from '../../../service'
import { setCurrentChat } from '../Chat/redux/conversationActionCreators';

import './UserList.scss';

export const UserList: React.FC = () => {
    const { conversations } = useTypeSelector(root => root.conversationReducer)
    const [activeTab, setActiveTab] = useState<string>('')
    const { user }: any = useTypeSelector(root => root.loginReducer);
    const dispatch = useTypeDispatch()
    const getUserHandler = (_id: string) => {
        setActiveTab(_id)
    }

  useEffect(() => {
    const getConverSation = () => {
        dispatch(chatService.getAllConversations(user._id))
    }
    getConverSation()
  },[user._id])
  
    const setChat = (currChat: any) => {
        setActiveTab(currChat._id)
        dispatch(setCurrentChat(currChat))
    }
    if (conversations && conversations.length === 0) {
        return <h1>no data</h1>
    }
    return (
        <div className="list-container">
            <ul className="list-users">
                {conversations && conversations.map((conversation: ConversationInt) => {
                    return (
                        <li
                            key={conversation._id}
                            onClick={() => {
                                setChat(conversation)
                            }}
                        >
                            <User
                                conversation={conversation}
                                curUser={user}
                                onGetUser={getUserHandler}
                                activeTab={activeTab}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

interface UserComponent {
    curUser: UserInt;
    onGetUser: (_id: string) => void;
    activeTab: string;
    conversation: ConversationInt;
}

const User = memo(({ curUser, onGetUser, activeTab, conversation }: UserComponent): any => {
   const [user, setUser] = useState<any>({})
    useEffect(() => {
        const friendId =  conversation.members.find(m => m !== curUser._id)
        const getuser = async () => {
            try {
                const res = await axios.get('/api/users?userId=' + friendId)
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getuser()
   },[])
   if(!user?._id) {
       return null
   }

   return (
    <div className="user-container">
        <div className={`user-box ${activeTab === user._id ? 'active-tab' : ''}`}>
            <img className="user-image" src={`assets/images/${user.img}`} alt="user" />
            <div className="user-name">
                {user.username}
            </div>
        </div>
    </div>
   )
    
})
