import React, { useState, useEffect } from 'react'
import { FaUserAlt, FaKey } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'

import '../Form.scss'
import chatService from '../../service'
import { UserAuth } from './redux/loginActionCreators'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Rules, DefaultsFields } from './ValidationForm'
let defaultField: DefaultsFields = {
    username: "",
    password: ""
}

let rules: Rules = {
    username: {
        required: true,
        minLength: {
            value: 6,
            message: "username to shot"
        },
        maxLength: {
            value: 16,
            message: "username to long"
        }
    },
    password: {
        required: true,
        minLength: {
            value: 6,
            message: "password to shot"
        },
        maxLength: {
            value: 16,
            message: "password to long"
        }
    }
}
export const Login = () => {

    const { handleSubmit, control, setValue, reset, formState: { errors } } = useForm<DefaultsFields>()

    const dispatch = useTypeDispatch()

    const onSubmit: SubmitHandler<DefaultsFields> = (values) => {
        let user = {
            ...values,
            id: "615db7a8a145e5fafe06387e"
        }
        dispatch(chatService.loginAuth(user))
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
                    <h1>Login</h1>
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
                                        {fieldState.error && <p className="error-form">ivalid username</p>}
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
                                console.log(fieldState)
                                return (
                                    <>
                                        <label htmlFor="password">
                                            <FaKey />
                                            <input
                                                type="text"
                                                name={name}
                                                onChange={onChange}
                                                name="password"
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
