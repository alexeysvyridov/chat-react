import React, { useEffect, useRef, useState } from 'react';
import {io} from 'socket.io-client'
import { makeStyles } from '@material-ui/core';
import './Chat.scss'
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../../hooks/useTypeDispatch';
import ChatService from '../../../service'
import { UserInt } from '../../../ModelService/Models';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '0 auto',
        width: '800px',
        height: '100%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    messages: {
        overflow: 'scroll',
        overflowX: 'hidden',
        height: `calc(100% - 60px)`,
        padding: '10px 0px'
    },
    MessageBar: {
        height: '20vh',
    },
    wrapperInput: {
        width: '100%',
        display: 'flex',
    },
    input: {
        width: '100%',
        minWidth: '400px',
        height: '50px'
    },
    submit: {
        width: '250px',
        height: '50px'
    }
}));



export const Chat: React.FC = () => {
    const classes = useStyles()
    const { user }: any = useTypeSelector(root => root.loginReducer);
    const dispatch = useTypeDispatch()
    const { currentChat, messages, loading } = useTypeSelector(root => root.conversationReducer);
    const socketRef = useRef(io("ws://localhost:5000"))
    useEffect(() => {
        dispatch(ChatService.getAllConversations(user.id))
    }, [user.id])

    useEffect(() => {
       socketRef.current.emit("adduser", user.id)     
    })
    return (
        <div className={classes.root}>
            <div className={classes.messages}>
                {currentChat != null ? (
                    <>
                        <Messages 
                            currentChat={currentChat}
                            messages={messages}
                            loading={loading}
                            user={user}
                        />
                    </>
                ) : (
                    <span>no active chat</span>
                )}
            </div>
            <div className={classes.wrapperInput}>
                <MessageBar user={user} currentChat={currentChat} />
            </div>
        </div>
    )
}


function MessageBar({ user, currentChat }: any): React.ReactElement {
    const [value, setValue] = useState('');
    const dispatch = useTypeDispatch()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let message = {
            conversationId: user.id,
            text: value,
            sender: currentChat._id
        }
        dispatch(ChatService.sendNewMessage(message))

    }
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <div className="wrapperInput">
            <form className="form-message" onSubmit={handleSubmit}>
                <input type="text"
                    className="input"
                    placeholder="Message"
                    onChange={inputHandler}
                    value={value}
                />
                <input className="submit" type="submit" />
            </form>
        </div>
    )
}

function Messages({currentChat, messages, loading, user}:any): React.ReactElement {
    const dispatch = useTypeDispatch()
    const scrollRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        dispatch(ChatService.getAllMessages(currentChat._id))
    }, [currentChat._id]);

    useEffect(() => {
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({behavior:'smooth'})
        }, 100)
    }, [messages])

    if (loading) {
        return <h1>Please wait....</h1>
    }
    return (
        <div className="wrapper-messages">
            {messages.map((message: any) => {
                return (
                    <div ref={scrollRef} key={message._id}>
                        <Message
                            own={message.sender === user.id}
                            user={message}
                        />
                    </div>
                )
            })}
        </div>
    )
}

function Message({ own, user }: any) {

    return (
        <div className={`message-box ${own ? 'left-side' : 'right-side'}`} key={user.id}>
                <div className="message-top">
                    <div className="message-box">
                        <img className="meessage-image" src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                    </div>
                <div className="message-text">
                    {user.text}
                </div>
                </div>
                <div className="message-time">{user.createdAt}</div>
                {/* <div className="chat-online">
                    online
                </div> */}
        </div>
    )
}