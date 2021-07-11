import React, { useState } from 'react'
import { Card, CardContent, Typography, TextField } from '@material-ui/core'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import SelectPlaces from './components/SearchPlaces'
import 'react-day-picker/lib/style.css'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { addMeeting } from 'store/actions'

function DateInput(props: never) {
    return <TextField label="Meeting Date" {...props} />
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
            date: meetingDate,
            group_id: new Date().getTime(),
        }
        dispatch(addMeeting(meetingData))
    }

    return (
        <Card className="add-meeting-wrapper">
            <CardContent>
                <Typography variant="h6">Add Meeting</Typography>
                <div className="add-meeting-form flex flex-col">
                    <TextField label="Person Name" value={name} onChange={handleNameChange} />
                    <DayPickerInput component={DateInput} value={meetingDate} onDayChange={handleDateChange} />
                    <SelectPlaces onSelect={handleLocation} />
                    <Typography>
                        Location: {location.latitude},{location.longitude}
                    </Typography>
                </div>
                <Button className="meeting-submit-btn" color="primary" variant="contained" onClick={handleAddMeeting}>
                    Add
                </Button>
            </CardContent>
        </Card>
    )
}

export default AddMeeting
