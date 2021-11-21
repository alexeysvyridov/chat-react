import React from 'react'
import { useTypeDispatch } from '../../../hooks/useTypeDispatch';
import chatService from '../../../service';
import ProfileAndSettings from './ProfileAndSettings';
import './UserProfile.scss'

const UserProfile:React.FC = ():React.ReactElement => {
  
    const dispatch = useTypeDispatch();

    const onSignOut = () => {
        dispatch(chatService.signOutWrapper())
    }

    return (
        <div className="user-container">
                <ProfileAndSettings
                    signOutHandler={onSignOut}
                />
            
        </div>
    )
}

export default UserProfile
