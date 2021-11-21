import React from 'react'
import { TopBar } from './TopBar/TopBar'
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { UserList } from './UserList/UserList';
import { Chat } from './Chat/Chat';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#e6ecf3',
        height: '100%',
        maxHeight: '100%',
        width: '100%',
        padding: '0px',
        margin: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    topBar: {
        borderBottom: '1px solid black',
        minHeight: '60px'
    },
    userList: {
        borderRight: '1px solid black',
        minHeight: '100%',
        height: `calc(100vh - 90px)`,
        overflow: 'auto'
    }
}));
export const Home = React.memo((props: any) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid className={classes.topBar} item xs={12}>
                    <TopBar />
                </Grid>
                <Grid className={classes.userList} item xs={4}>
                    <UserList />
                </Grid>
                <Grid className={classes.userList} item xs={8}>
                    <Chat />
                </Grid>
            </Grid>
        </div>
    )
})
