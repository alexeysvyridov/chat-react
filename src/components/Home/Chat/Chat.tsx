import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core';
import { Users } from '../../../dummyData'
import './Chat.scss'
// import { MessageInt } from '../../../ModelService/Models';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../../hooks/useTypeDispatch';
import ChatService from '../../../service'

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
        overflow: 'auto',
        overflowY: 'hidden',
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
    const { currentChat } = useTypeSelector(root => root.conversationReducer);


    useEffect(() => {
        dispatch(ChatService.getAllConversations(user.id))
    }, [])


    return (
        <div className={classes.root}>
            <div className={classes.messages}>
                {currentChat ? (
                    <>
                        <Messages />
                    </>
                ) : (
                    <span>no active chat</span>
                )}
            </div>
            <div className={classes.wrapperInput}>
                <MessageBar />
            </div>
        </div>
    )
}


function MessageBar(): React.ReactElement {
    return (
        <div className="wrapperInput">
            <form className="form-message">
                <input type="text"
                    className="input"
                    placeholder="Message"
                />
                <input className="submit" type="submit" />
            </form>
        </div>
    )
}
function Messages(): React.ReactElement {
    const dispatch = useTypeDispatch()
    const { user }: any = useTypeSelector(root => root.loginReducer);
    const { currentChat, messages } = useTypeSelector(root => root.conversationReducer);

    useEffect(() => {
        dispatch(ChatService.getAllMessages(currentChat._id))
    }, [currentChat]);

    console.log(user)
    return (
        <div className="wrapper-messages">
            {messages.map((message: any) => {
                return (
                    <Message
                        key={message._id}
                        own={message.sender === user.id}
                        user={message}
                    />
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
                    <img className="meessage-image" src={`assets/images/${user.profilePicture}`} />
                </div>
            </div>
            <div className="message-text">
                {user.text}
            </div>
            <div className="message-time">{user.createdAt}</div>
            <div className="chat-online">
                online
            </div>
        </div>
    )
}