import React, { useState, useEffect } from 'react'
import { FaUserAlt, FaKey } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'

import '../Form.scss'
import chatService from '../../service'
import { UserAuth } from './redux/loginActionCreators'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { DefaultsFields } from './ValidationForm'
import { rules } from '../../constants/defaults'

export const Login = () => {

    const { handleSubmit, control, reset } = useForm<DefaultsFields>()

    const dispatch = useTypeDispatch()

    const onSubmit: SubmitHandler<DefaultsFields> = (values) => {
        dispatch(chatService.loginAuth(values))
        // reset({...values})
        // console.log(values)
    }
    // reset()

    // const inputHandler = (input: React.ChangeEvent<HTMLInputElement>) => {
    //     setUser((prev) => {
    //         return {
    //             ...prev,
    //             [input.target.name]: input.target.value
    //         }
    //     })
    // }

    return (
        <div className="container-form">
            <div className="wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login to Chat</h1>
                    <div className="username">
                        <Controller
                            control={control}
                            name="username"
                            rules={rules.username}
                            render={({ field: { onChange, name }, fieldState }) => {
                                return (
                                    <>
                                        <label htmlFor="username">
                                            <FaUserAlt />
                                            <input
                                                type="text"
                                                onChange={onChange}
                                                name={name}
                                                placeholder="Username"
                                            />
                                        </label>
                                        {fieldState.error && <p className="error-form">{fieldState.error.message}</p>}
                                    </>
                                )
                            }}
                        />
                    </div>
                    <div className="password mt-20">
                        <Controller
                            control={control}
                            name="password"
                            rules={rules.password}
                            render={({ field: { onChange, name }, fieldState }) => {
                                return (
                                    <>
                                        <label htmlFor="password">
                                            <FaKey />
                                            <input
                                                type="text"
                                                name={name}
                                                onChange={onChange}
                                                placeholder="Password"
                                            />
                                        </label>
                                        {fieldState.error && <p className="error-form">{fieldState.error.message}</p>}
                                    </>
                                )
                            }}
                        />
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
