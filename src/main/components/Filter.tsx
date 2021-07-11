import React from 'react'
import clsx from 'clsx'
import { Card, makeStyles, Typography, CardContent, CardActions, IconButton, Icon } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import DateRange from './DateRange'
import { FilterType } from 'main/types/List'

const useStyles = makeStyles({
    root: {
        margin: 5,
        position: 'absolute',
        top: 20,
        right: 0,
        width: 400,
        height: 450,
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

type FilterProps = {
    filter: FilterType,
    handleFilter: (type: string, newFilter: FilterType['fromDate'] | FilterType['toDate'] | FilterType['groupBy']) => void,
    onClose: React.MouseEventHandler<HTMLButtonElement>,
}

function Filter({ filter, handleFilter, onClose }: FilterProps): JSX.Element {
    const classes = useStyles()

    function handleGroupBy(evt: React.ChangeEvent<HTMLInputElement>) {
        handleFilter('groupBy', evt.target.value)
    }

    return (
        <Card className={clsx(classes.root)}>
            <CardActions className={clsx(classes.cardHeader)}>
                <Typography variant="body1">Filter</Typography>
                <IconButton size="small" onClick={onClose}>
                    <Icon>close</Icon>
                </IconButton>
            </CardActions>
            <CardContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Group By</FormLabel>
                    <RadioGroup row aria-label="group_by" name="group_by" value={filter.groupBy} onChange={handleGroupBy}>
                        <FormControlLabel value="" control={<Radio />} label="None" />
                        <FormControlLabel value="date" control={<Radio />} label="Date" />
                        <FormControlLabel value="name" control={<Radio />} label="Name" />
                    </RadioGroup>
                </FormControl>

                <FormControl className="mt-5" component="fieldset">
                    <FormLabel component="legend">By Date Range</FormLabel>
                    <DateRange fromDate={filter.fromDate} toDate={filter.toDate} />
                </FormControl>
            </CardContent>
        </Card>
    )
}

export default Filter
