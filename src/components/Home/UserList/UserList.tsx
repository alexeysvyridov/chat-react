import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { UserInt } from '../../../ModelService/Models';
import chatService from '../../../service'

import './UserList.scss';
type TUsers = UserInt[];
export const UserList = () => {
    const [users, setUsers] = useState<TUsers>([])
    useEffect(() => {
        function getUsers() {
            chatService.getAllUsers()
                .then((res: any): void => {
                    setUsers(res)
                })
        }
        getUsers()
    }, [])

    if (users && users.length === 0) {
        return <h1>no data</h1>
    }
    return (
        <div className="list-container">
            <ul className="list-users">
                {users.map(user => {
                    return (
                        <li key={user._id}>
                            <User user={user} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

function User({ user }: any) {
    return (
        <div className="user-container">
            <div className="user-box">
                <img className="user-image" src={`assets/images/${user.img}`} />
                <div className="user-name">
                    {user.username}
                </div>
            </div>
        </div>
    )
}
