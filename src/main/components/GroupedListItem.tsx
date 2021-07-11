import React, { Fragment } from 'react'
import clsx from 'clsx'
import { makeStyles, Typography, Paper } from '@material-ui/core'
import { GroupedDataType } from 'main/types/List.d'
import ListItem from './ListItem'

const useStyles = makeStyles({
    groupListItem: {
        position: 'relative',
        marginTop: 10,
        padding: 10,
        borderBottom: '1px solid #aaa',
    },
    heading: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    groupName: {
        position: 'sticky',
        backgroundColor: '#fff',
        top: 0,
        fontSize: 15,
        fontWeight: 'bold',
    },
})

type GroupedListItemProps = {
    groupedData: GroupedDataType,
}

function GroupedListItem({ groupedData }: GroupedListItemProps): JSX.Element {
    const classes = useStyles()
    return (
        <>
            <Typography className={classes.heading}>Grouped Data</Typography>
            {Object.keys(groupedData).map(_group => {
                return (
                    <Paper key={_group} elevation={0} square className={clsx(classes.groupListItem)}>
                        <Typography className={classes.groupName}>{_group}</Typography>
                        {groupedData[_group].map(_meeting => {
                            return <ListItem key={_meeting.id} {..._meeting} />
                        })}
                    </Paper>
                )
            })}
        </>
    )
}

export default GroupedListItem
