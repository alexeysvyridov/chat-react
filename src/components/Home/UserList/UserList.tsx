import React from 'react'
import { Users } from '../../../dummyData'
import './UserList.scss';
export const UserList = () => {
    return (
        <div className="list-container">
            <ul className="list-users">
                {Users.map(user => {
                    return (
                        <li key={user.id}>
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
                <img className="user-image" src={`assets/${user.profilePicture}`} />
                <div className="user-name">
                    {user.username}
                </div>
            </div>
        </div>
    )
}
