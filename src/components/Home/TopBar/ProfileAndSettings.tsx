import React, { Fragment, useCallback, useState } from 'react'
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { UserInt } from '../../../ModelService/Models';
import { UserImage } from '../../Styles/UserImage';
import './UserProfile.scss'
interface Props {
    signOutHandler: () => void;
}
const ProfileAndSettings = ({signOutHandler}:Props):React.ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const {user}:any = useTypeSelector(root => root.loginReducer);
    const onToggler = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    return (
        <Fragment>
            <ul className="user-profile-wrapper">
                <li>
                    <UserImage 
                        src={`assets/images/${user?.img}`}
                        onClick={onToggler}
                    />
                </li>
                {isOpen && 
                <li className="user-profile">
                    <ul className="user-profile-body">
                        <li className="user-item">Profile</li>
                        <li className="user-item last" onClick={signOutHandler}>Log out</li>
                    </ul>
                </li>
                }
            </ul>
        </Fragment>
    )
}
export default ProfileAndSettings;