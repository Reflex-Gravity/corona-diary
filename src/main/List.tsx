import React, { memo, useEffect, useState } from 'react'
import { Card, CardContent, IconButton, Icon, Typography, makeStyles, createStyles, ThemeOptions } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store/types'
import { Input } from '@material-ui/core'

import Logout from './components/Logout'
import clsx from 'clsx'
import ListItem from './components/ListItem'

const useStyles = makeStyles((theme: ThemeOptions) =>
    createStyles({
        listWrapper: {
            position: 'relative',
            minHeight: 500,
        },
        filterWrapper: {
            backgroundColor: '#eee',
            padding: 10,
            marginBottom: 20,
        },
        noData: {
            marginTop: 50,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        button: {
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: '#3f51b5',
            color: '#ffffff',
            '&:hover': {
                color: '#333',
                backgroundColor: '#aaa',
            },
        },
    })
)

const EmptyMeetings: any = []

function List() {
    const [searchText, setSearchText] = useState('')
    const emailId = useSelector(({ emailId }: RootState) => emailId)
    const meetings = useSelector(({ meetings }: RootState) => meetings ?? EmptyMeetings)
    const history = useHistory()
    const classes = useStyles()

    useEffect(() => {
        if (!emailId) {
            history.push('/')
        }
    }, [emailId])

    function handleSearch(evt: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(evt.target.value)
    }

    function openAddMeeting() {
        history.push('/add-meeting')
    }

    const filteredData = meetings.filter(_data => {
        if (_data.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
            return _data
        }
    })

    return (
        <Card className={clsx(classes.listWrapper)}>
            <CardContent>
                <Typography variant="h5">Hi {emailId}</Typography>
                <Typography className="mt-5" variant="h6">
                    Your visits
                </Typography>
                <Logout />
                <div className={clsx('flex flex-row justify-between', classes.filterWrapper)}>
                    <Input placeholder="Search..." value={searchText} onChange={handleSearch} />
                    <IconButton>
                        <Icon>filter_list</Icon>
                    </IconButton>
                </div>
                {meetings.length === 0 && (
                    <Typography className={classes.noData} color="initial">
                        No Data.
                    </Typography>
                )}
                {filteredData.map(_meeting => {
                    return <ListItem key={_meeting.id} {..._meeting} />
                })}
                <IconButton color="primary" className={clsx(classes.button)} onClick={openAddMeeting}>
                    <Icon>add</Icon>
                </IconButton>
            </CardContent>
        </Card>
    )
}

export default memo(List)
