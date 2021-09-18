import React from 'react'
const users = [{ id: 1, name: "Vasya" }, { id: 2, name: "Petya" }, { id: 3, name: "Masha" }]
export const UserList = () => {
    return (
        <div className="list-wrapper">
            <ul>
                {users.map(user => {
                    return (
                        <li key={user.id}>
                            <div>{user.name}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
