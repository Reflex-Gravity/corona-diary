import React from 'react'
import clsx from 'clsx'
import { Card, makeStyles, Typography, CardContent, CardActions, ClickAwayListener, IconButton, Icon, Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import DateRange from './DateRange'
import { FilterType } from 'main/types/List'
import { HandleDateChangeType } from 'main/types/DateRange'

const useStyles = makeStyles({
    root: {
        margin: 5,
        position: 'absolute',
        top: 20,
        right: 0,
        width: 400,
        zIndex: 30,
        height: 450,
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateRangeLabel: {
        marginBottom: 10,
    },
    dateRange: {
        marginTop: 20,
    },
    clearBtn: {
        marginTop: 40,
    },
})

type FilterProps = {
    filter: FilterType,
    handleFilter: (type: HandleDateChangeType['type'] | 'groupBy', newFilter: FilterType['fromDate'] | FilterType['toDate'] | FilterType['groupBy']) => void,
    onClose: () => void,
    clearFilters: () => void,
}

function Filter({ filter, handleFilter, onClose, clearFilters }: FilterProps): JSX.Element {
    const classes = useStyles()

    // handles groupby filters, sets the groupBy type value in filter state.
    function handleGroupBy(evt: React.ChangeEvent<HTMLInputElement>) {
        handleFilter('groupBy', evt.target.value)
    }

    // handles Date Range filters, sets the fromDate and toDate value in filter state.
    function handleDateFilter(type: HandleDateChangeType['type'], date: HandleDateChangeType['date']) {
        handleFilter(type, date)
    }

    return (
        <ClickAwayListener onClickAway={onClose}>
            <Card className={clsx(classes.root)} elevation={3}>
                {/* Card Header */}
                <CardActions className={clsx(classes.cardHeader)}>
                    <Typography variant="h6">Filters</Typography>
                    <IconButton size="small" onClick={onClose}>
                        <Icon>close</Icon>
                    </IconButton>
                </CardActions>
                {/* Card Content */}
                <CardContent>
                    {/* Group By fields */}
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Group By</FormLabel>
                        <RadioGroup row aria-label="group_by" name="group_by" value={filter.groupBy} onChange={handleGroupBy}>
                            <FormControlLabel value="" control={<Radio />} label="None" />
                            <FormControlLabel value="date" control={<Radio />} label="Date" />
                            <FormControlLabel value="name" control={<Radio />} label="Name" />
                        </RadioGroup>
                    </FormControl>
                    {/* Date Range fields */}
                    <FormControl className={classes.dateRange} component="fieldset">
                        <FormLabel className={classes.dateRangeLabel} component="legend">
                            Date Range
                        </FormLabel>
                        <DateRange fromDate={filter.fromDate} toDate={filter.toDate} handleDateChange={handleDateFilter} />
                    </FormControl>
                    {/* Clear button */}
                    <Button variant="contained" color="primary" className={classes.clearBtn} onClick={clearFilters}>
                        Clear
                    </Button>
                </CardContent>
            </Card>
        </ClickAwayListener>
    )
}

export default Filter
