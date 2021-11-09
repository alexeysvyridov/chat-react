import React from 'react'
import { Bar } from '../../Styles/Bar'
import LogOutIcon from '../../Styles/LogOutIcon'
import chatService from '../../../service'
import { useTypeDispatch } from '../../../hooks/useTypeDispatch'
import ChatIcon from '../../Styles/ChatIcon'
export const TopBar: React.FC = (): React.ReactElement => {
    const dispatch = useTypeDispatch()
    const signOut = () => {
        dispatch(chatService.signOutWrapper())
    }
    return (
        <Bar>
            <ChatIcon />
            <LogOutIcon onClick={signOut} />
        </Bar>
    )
}
