import React, { memo, useEffect, useState } from 'react'
import { Card, CardContent, IconButton, Icon, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store/types'
import { Input } from '@material-ui/core'

function List() {
    const [searchText, setSearchText] = useState('')
    const emailId = useSelector(({ emailId }: RootState) => emailId)
    const history = useHistory()

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

    return (
        <Card className="list-wrapper">
            <CardContent>
                <Typography variant="h5">Hi {emailId}</Typography>
                <Typography variant="h6">Your visits</Typography>

                <div className="flex flex-row justify-between">
                    <Input placeholder="Search..." value={searchText} onChange={handleSearch} />
                    <IconButton>
                        <Icon>filter_list</Icon>
                    </IconButton>
                </div>
                <IconButton className="add-button" onClick={openAddMeeting}>
                    <Icon>add</Icon>
                </IconButton>
            </CardContent>
        </Card>
    )
}

export default memo(List)
