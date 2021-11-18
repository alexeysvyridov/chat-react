import React from 'react'
import { Bar } from '../../Styles/Bar'

import ChatIcon from '../../Styles/ChatIcon'
import UserProfile from './UserProfile'
export const TopBar: React.FC = (): React.ReactElement => {
   
 
    return (
        <Bar>
            <ChatIcon />
            <div>
                {/* <LogOutIcon/> */}
                <UserProfile/>
            </div>
        </Bar>
    )
}
