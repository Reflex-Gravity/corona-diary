import React from 'react'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import { Meetings } from 'store/types'

const useStyles = makeStyles({
    root: {
        margin: 5,
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        maxWidth: 300,
    },
    location: {
        maxWidth: 300,
    },
    date: {
        maxWidth: 300,
    },
})

function ListItem({ name, date, location }: Meetings): JSX.Element {
    const classes = useStyles()

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                <Typography className={classes.name}>{name}</Typography>
                <Typography className={classes.location}>{location}</Typography>
                <Typography className={classes.date}>{date}</Typography>
            </CardContent>
        </Card>
    )
}

export default ListItem
