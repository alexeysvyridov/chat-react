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
        height: '80vh',
        maxHeight: '80vh',
        overflow: 'auto',
        overflowY: 'hidden',
        padding: '20px 0px'
    },
    MessageBar: {
        height: '20vh',
    },
    wrapperInput: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',

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
    // const classes = useStyles()
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
    // const [messages, setMessages] = useState<MessageInt[]>([]);
    const { user }: any = useTypeSelector(root => root.loginReducer);
    const { currentChat } = useTypeSelector(root => root.conversationReducer);

    const dispatch = useTypeDispatch()
    useEffect(() => {
        console.log(currentChat)
        dispatch(ChatService.getAllMessages(currentChat._id))
    }, [currentChat])
    // useEffect(() => {
    //     ChatService.getAllMessages(currentChat._id)
    //         .then(messages => {
    //             console.log(messages)
    //         })
    // }, [])
    return (
        <div className="wrapper-messages">
            {Users.map((user: any) => {
                return (
                    <Message
                        key={user.id}
                        own
                        user={user}
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
                {user.message}
            </div>
            <div className="chat-online">
                online
            </div>
        </div>
    )
}