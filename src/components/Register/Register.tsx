import React, { useState, useEffect } from 'react'
import { FaUserAlt, FaKey } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../Form.scss'
export const Register = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(user);
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
                    <h1>Register</h1>
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
                        <span>Go to login </span>
                        <Link to="/login">
                            <span>login</span>
                        </Link>
                    </div>
                    <div className="submit-btn">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    )
}
