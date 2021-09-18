import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core';
import { Users } from '../../../dummyData'
import './Chat.scss'
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
        justifyContent: 'center'
    },
    input: {
        width: '100%',
        height: '50px'
    }
}));
export const Chat: React.FC = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.messages}>
                <Messages />
            </div>
            <div className={classes.wrapperInput}>
                <MessageBar />
            </div>
        </div>
    )
}


function MessageBar(): React.ReactElement {
    const classes = useStyles()
    return (
        <div className={classes.wrapperInput}>
            <input type="text"
                className={classes.input}
                placeholder="Message"
            />
        </div>
    )
}
function Messages(): React.ReactElement {
    return (
        <div className="wrapper-messages">
            {Users.map((user: any) => {
                return (
                    <div className="message-box" key={user.id}>
                        <div className="message-top">
                            <div className="message-box">
                                <img className="meessage-image" src={`assets/${user.profilePicture}`} />
                            </div>
                        </div>
                        <div className="message-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste facilis assumenda inventore aliquid, officiis iusto repudiandae doloremque at? Hic sint saepe consequatur ullam quidem pariatur nesciunt odit ratione molestiae ad.
                        </div>
                    </div>
                )
            })}
        </div>

    )
}