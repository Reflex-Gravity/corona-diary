import React, { forwardRef } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { makeStyles, TextField } from '@material-ui/core'
import 'react-day-picker/lib/style.css'
import { DateRangeType } from 'main/types/DateRange'
import clsx from 'clsx'
import { isDate } from 'date-fns/esm'

const useStyles = makeStyles({
    dateInput: {
        marginLeft: 10,
    },
    toDateWrapper: {
        right: 0,
    },
})

type OverlayComponentProps = {
    children: Element,
}

function OverlayComponent({ children, ...props }: OverlayComponentProps) {
    const classes = useStyles()

    return (
        <div className={clsx(classes.toDateWrapper)} {...props}>
            {children}
        </div>
    )
}

// eslint-disable-next-line react/display-name
const DateInput = forwardRef((props: never, ref) => {
    const classes = useStyles()
    return <TextField ref={ref} className={classes.dateInput} {...props} />
})

function DateRange({ fromDate, toDate, handleDateChange }: DateRangeType): JSX.Element {
    function handleFromChange(_from: Date) {
        // validate the date
        if (isDate(_from)) {
            handleDateChange('fromDate', _from.getTime())
        }
    }

    function handleToChange(_to: Date) {
        // validate the date
        if (isDate(_to)) {
            handleDateChange('toDate', _to.getTime())
        }
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
                overlayComponent={OverlayComponent}
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
