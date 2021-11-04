import axios from 'axios';
import { memo, useEffect, useState } from 'react'
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ConversationInt, UserInt } from '../../../ModelService/Models';
import chatService from '../../../service'

import './UserList.scss';

export const UserList: React.FC = () => {
    const [users, setUsers] = useState<UserInt[]>([])
    const { conversations } = useTypeSelector(root => root.conversationReducer)
    const [activeTab, setActiveTab] = useState<string>('')
    const { user }: any = useTypeSelector(root => root.loginReducer);
    const getUserHandler = (_id: string) => {
        setActiveTab(_id)
    }

    useEffect(() => {
        function getUsers() {
            chatService.getAllConversations(user._id)
        }
        getUsers()
    }, [])

    if (conversations && conversations.length === 0) {
        return <h1>no data</h1>
    }

    return (
        <div className="list-container">
            <ul className="list-users">
                {conversations && conversations.map((conversation) => {
                    return (
                        <li
                            key={conversation._id}
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
    useEffect(() => {
        const friendId = conversation.members.find((m: any) => m !== curUser._id)
        console.log(friendId)
        const getUser = async () => {
            try {
                const res = await axios.get('/api/users?userId=' + friendId)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [conversation, curUser])
    return (
        <div className="user-container"
            onClick={() => {
                onGetUser(conversation._id)
            }}>
            <div className={`user-box ${activeTab === conversation._id ? 'active-tab' : ''}`}>
                <img className="user-image" src={`assets/images/${conversation.img}`} alt="user" />
                {/* <div className="user-name">
                    {conversation.username}
                </div> */}
            </div>
        </div>
    )
})
