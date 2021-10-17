import React, { useState, useEffect } from 'react'
import { FaUserAlt, FaKey } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { useTypeSelector } from '../../hooks/useTypeSelector'

import '../Form.scss'
import chatService from '../../service'

export const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        id: '615db7a8a145e5fafe06387e'
    })

    const loginReducer = useTypeSelector(state => state.loginReducer)
    const dispatch = useTypeDispatch()
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(chatService.loginAuth(user))
    }
    useEffect(() => {
    }, [user.username, user.password])

    const handleSubmit = (input: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => {
            return {
                ...prev,
                [input.target.name]: input.target.value
            }
        })
    }

    return (
        <div className="container-form">
            <div className="wrapper">
                <form onSubmit={submit}>
                    <h1>Login</h1>
                    <div className="username">
                        <label htmlFor="username">
                            <FaUserAlt />
                            <input
                                type="text"
                                onChange={handleSubmit}
                                name="username"
                                placeholder="Username"
                            />
                        </label>
                    </div>
                    <div className="password mt-20">
                        <label htmlFor="password">
                            <FaKey />
                            <input
                                type="text"
                                onChange={handleSubmit}
                                name="password"
                                placeholder="Password"
                            />
                        </label>
                    </div>
                    <div className="create-account">
                        <span>Do you have an account?</span>
                        <Link to="/register">
                            <span>register</span>
                        </Link>
                    </div>
                    <div className="submit-btn">
                        <input type="submit" value="Sign In" />
                    </div>
                </form>
            </div>
        </div>
    )
}
