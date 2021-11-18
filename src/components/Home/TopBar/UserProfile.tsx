import { AnyARecord } from 'dns';
import React from 'react'
import { useTypeDispatch } from '../../../hooks/useTypeDispatch';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { UserImage } from '../../Styles/UserImage';
import chatService from '../../../service'
const UserProfile:React.FC = ():React.ReactElement => {
    const {user}:any = useTypeSelector(root => root.loginReducer)
    const dispatch = useTypeDispatch()
    const signOut = () => {
        dispatch(chatService.signOutWrapper())
    }
    return (
        <div className="user-container" onClick={signOut}>
            <UserImage 
                src={`assets/images/${user?.img}`}
            />
                
        </div>
    )
}

export default UserProfile
