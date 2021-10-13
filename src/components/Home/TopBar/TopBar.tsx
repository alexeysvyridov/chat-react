import React from 'react'
import { Bar } from '../../Styles/Bar'

export const TopBar: React.FC = () => {
    return (
        <Bar>
            logo
            <span className="material-icons-outlined">
                login
            </span>
        </Bar>
    )
}
