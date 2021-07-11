import React, { forwardRef } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { makeStyles, TextField } from '@material-ui/core'
import 'react-day-picker/lib/style.css'
import { DateRangeType } from 'main/types/DateRange'

const useStyles = makeStyles({
    dateInput: {
        marginLeft: 10,
    },
})

// eslint-disable-next-line react/display-name
const DateInput = forwardRef((props: never, ref) => {
    const classes = useStyles()
    return <TextField ref={ref} className={classes.dateInput} {...props} />
})

function DateRange({ fromDate, toDate, handleDateChange }: DateRangeType): JSX.Element {
    function handleFromChange(_from: Date) {
        handleDateChange('fromDate', _from.getTime())
    }

    function handleToChange(_to: Date) {
        handleDateChange('toDate', _to.getTime())
    }

    return (
        <div className="flex">
            <DayPickerInput
                value={fromDate ? new Date(fromDate) : undefined}
                placeholder="Start Date"
                format="DD/MM/YYYY"
                component={DateInput}
                dayPickerProps={{
                    disabledDays: { after: new Date(toDate ?? '') },
                }}
                onDayChange={handleFromChange}
            />{' '}
            —{' '}
            <DayPickerInput
                value={toDate ? new Date(toDate) : undefined}
                placeholder="End Date"
                format="DD/MM/YYYY"
                component={DateInput}
                dayPickerProps={{
                    disabledDays: { before: new Date(fromDate ?? '') },
                }}
                onDayChange={handleToChange}
            />
        </div>
    )
}

export default DateRange
