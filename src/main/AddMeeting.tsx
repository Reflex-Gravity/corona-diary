import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Typography, TextField, IconButton, Icon, makeStyles, CardActions, Button } from '@material-ui/core'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { addMeeting } from 'store/actions'

import 'react-day-picker/lib/style.css'

import LocateMe from './components/LocateMe'
import Logout from './components/Logout'
import clsx from 'clsx'

const useStyles = makeStyles({
    margin: {
        marginTop: 10,
        marginBottom: 10,
    },
})

function DateInput(props: never) {
    return <TextField className="mt-5" label="Meeting Date" {...props} />
}

const defaultLocation: GeolocationCoordinates = {
    latitude: 0.0,
    longitude: 0.0,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
}

function AddMeeting(): JSX.Element {
    const [name, setName] = useState('')
    const [location, setLocation] = useState(defaultLocation)
    const [meetingDate, setMeetingDate] = useState(new Date())
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    function handleNameChange(evt: React.ChangeEvent<HTMLInputElement>) {
        setName(evt.target.value)
    }

    function handleDateChange(date: Date) {
        setMeetingDate(date)
    }

    function handleLocation(pos: GeolocationPosition): void {
        setLocation(pos.coords)
    }

    function handleAddMeeting() {
        const meetingData = {
            name,
            location: `${location.latitude},${location.longitude}`,
            date: meetingDate.getTime(),
            id: new Date().getTime(),
        }
        dispatch(addMeeting(meetingData))
        history.push('/list')
    }

    function goBack() {
        history.push('/list')
    }

    return (
        <Card className="add-meeting-wrapper">
            <CardContent>
                <CardActions>
                    <IconButton onClick={goBack}>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                    <Typography variant="h6">Add Meeting</Typography>
                </CardActions>
                <Logout />
                <div className="flex flex-col">
                    <TextField className={classes.margin} label="Person Name" value={name} onChange={handleNameChange} />
                    <DayPickerInput component={DateInput} value={meetingDate} onDayChange={handleDateChange} />
                    <div className={clsx(classes.margin, 'flex items-center mt-5')}>
                        <Typography className={classes.margin}>
                            Location: {location.latitude},{location.longitude}
                        </Typography>
                        <LocateMe onSelect={handleLocation} />
                    </div>
                </div>
                <Button className="meeting-submit-btn" color="primary" variant="contained" onClick={handleAddMeeting}>
                    Add
                </Button>
            </CardContent>
        </Card>
    )
}

export default AddMeeting
