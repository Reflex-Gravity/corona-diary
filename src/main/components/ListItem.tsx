import React from 'react'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import { Meetings } from 'store/types'
import clsx from 'clsx'
import { format } from 'date-fns'

const useStyles = makeStyles({
    root: {
        margin: 5,
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    name: {
        maxWidth: 300,
        fontSize: 18,
        textTransform: 'capitalize',
    },
    location: {
        maxWidth: 300,
        fontSize: 12,
    },
    date: {
        maxWidth: 300,
        fontSize: 12,
        fontWeight: 'bold',
    },
    rightContent: {
        textAlign: 'right',
    },
})

function ListItem({ name, date, location }: Meetings): JSX.Element {
    const classes = useStyles()

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                <Typography className={classes.name}>{name}</Typography>
                <div className={clsx('flex flex-col', classes.rightContent)}>
                    <Typography component="span" className={classes.date}>
                        {format(date, 'do MMM yyyy')}
                    </Typography>
                    <Typography className={classes.location}>{location}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default ListItem
