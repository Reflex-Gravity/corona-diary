import React, { useRef, useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { FilterType } from 'main/types/List'

import 'react-day-picker/lib/style.css'

type DateRangeType = {
    fromDate: FilterType['fromDate'],
    toDate: FilterType['toDate'],
}

function DateRange({ fromDate, toDate }: DateRangeType): JSX.Element {
    const toDateRef = useRef(null)
    const [from, setFrom] = useState(new Date())
    const [to, setTo] = useState(new Date())

    function handleFromChange(_from: Date) {
        setFrom(_from)
    }

    function handleToChange(_to: Date) {
        setTo(_to)
    }

    return (
        <div>
            <DayPickerInput
                value={from}
                placeholder="From"
                format="LL"
                dayPickerProps={{
                    disabledDays: { after: to },
                }}
                onDayChange={handleFromChange}
            />{' '}
            —{' '}
            <DayPickerInput
                ref={toDateRef}
                value={to}
                placeholder="To"
                format="LL"
                dayPickerProps={{
                    disabledDays: { before: from },
                }}
                onDayChange={handleToChange}
            />
        </div>
    )
}

export default DateRange
