import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core';
import { classicNameResolver } from 'typescript';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
export const Chat: React.FC = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            chat
        </div>
    )
}
