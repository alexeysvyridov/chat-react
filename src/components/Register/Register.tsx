import { useState, useEffect } from 'react';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'

import { Link } from 'react-router-dom';
import chatService from '../../service';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { DefaultsFieldsRegister } from '../Login/ValidationForm';
import '../Form.scss';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { rules } from '../../constants/defaults'
export const Register = () => {
    const { handleSubmit, control, reset } = useForm<DefaultsFieldsRegister>()

    const dispatch = useTypeDispatch()

    const onSubmit: SubmitHandler<DefaultsFieldsRegister> = (values) => {
        let user = {
            ...values,
            id: "615db7a8a145e5fafe06387e"
        }
        dispatch(chatService.loginAuth(user))
        // reset({...values})
        // console.log(values)
    }

    return (
        <div className="container-form">
            <div className="wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Register</h1>
                    <div className="m-field email">
                        <Controller
                            control={control}
                            name="email"
                            rules={rules.email}
                            render={({ field: { onChange, name }, fieldState }) => {
                                return (
                                    <>
                                        <label htmlFor="email">
                                            <MdEmail />
                                            <input
                                                type="text"
                                                onChange={onChange}
                                                name={name}
                                                placeholder="email"
                                            />
                                        </label>
                                        {fieldState.error && <p className="error-form">{fieldState.error.message}</p>}
                                    </>
                                )
                            }}
                        />
                    </div>
                    <div className="m-field username">
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
                    <div className="m-field password">
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
