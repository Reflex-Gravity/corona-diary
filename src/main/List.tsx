import React, { lazy, memo, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { Card, CardContent, IconButton, Icon, Typography, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store/types'
import { Input } from '@material-ui/core'

import Logout from './components/Logout'
import NoData from './components/NoData'
import ListItem from './components/ListItem'
import WrappedSuspense from './components/WrappedSuspense'
import { FilterType, GroupedDataType } from './types/List'
import { HandleDateChangeType } from './types/DateRange'

const Filter = lazy(() => import('./components/Filter'))
const GroupedListItem = lazy(() => import('./components/GroupedListItem'))

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
    },
    listWrapper: {
        position: 'relative',
        minHeight: 500,
        maxHeight: 'calc(100vh - 20px)',
        overflowY: 'auto',
    },
    filterWrapper: {
        backgroundColor: '#eee',
        zIndex: 20,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            color: '#333',
            backgroundColor: '#aaa',
        },
    },
    title: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
    },
})

const defaultFilter: FilterType = {
    groupBy: '',
    fromDate: null,
    toDate: null,
}

const EmptyMeetings: any = []

function List() {
    const [searchText, setSearchText] = useState('')
    const [filter, setFilter] = useState(defaultFilter)
    const [isFilterOpen, setFilterOpen] = useState(false)
    const emailId = useSelector(({ emailId }: RootState) => emailId)
    const meetings = useSelector(({ meetings }: RootState) => meetings ?? EmptyMeetings)
    const history = useHistory()
    const classes = useStyles()

    useEffect(() => {
        if (!emailId) {
            history.push('/')
        }
    }, [emailId, history])

    function handleSearch(evt: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(evt.target.value)
    }

    function openAddMeeting() {
        history.push('/add-meeting')
    }

    function toggleFilterView() {
        setFilterOpen(!isFilterOpen)
    }

    /**
     * Sets filter selection at one place
     *
     */
    function handleFilter(type: HandleDateChangeType['type'] | 'groupBy', newFilter: FilterType['fromDate'] | FilterType['toDate'] | FilterType['groupBy']) {
        const updatedFilter = {
            ...filter,
            [type]: newFilter,
        }
        // reset groupBy filters when date range is selected
        if (type === 'fromDate' || type === 'toDate') {
            updatedFilter.groupBy = ''
        }
        // reset date range filters when groupBy is selected
        else if (type === 'groupBy') {
            updatedFilter.fromDate = null
            updatedFilter.toDate = null
        }
        setFilter(updatedFilter)
    }

    function handleClearFilter() {
        setFilter(defaultFilter)
    }

    const filteredData = useMemo(() => {
        // Filters the meetings if they are available
        if (searchText.length > 0 || filter.fromDate || filter.toDate) {
            return meetings.filter(meeting => {
                // returns meeting without filtering if no fiters are enabled.

                // Filter the date based on search text
                if (searchText.length > 0) {
                    if (meeting.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                        return meeting
                    }
                    return false
                }
                // filter the data only when date filter is enabled
                const isDateFilter = filter.fromDate && filter.toDate
                if (isDateFilter) {
                    // Check if this meeting date is between from date and to date
                    // The date values here are in UNIX timestamp format
                    if (meeting.date >= (filter.fromDate ?? 0) && meeting.date <= (filter.toDate ?? 0)) {
                        return meeting
                    }
                    return false
                }
                return meeting
            })
        }
        // return meetings, if no filters are available
        return meetings
    }, [filter.fromDate, filter.toDate, meetings, searchText])

    const groupedData: GroupedDataType = useMemo(() => {
        // Do groupby conversion only if enabled
        if (filter.groupBy) {
            // TODO:: avoid duplicaiton and merge the iteration.

            // Groupby Date
            if (filter.groupBy === 'date') {
                let groupedData: GroupedDataType = {}
                meetings.forEach(_meeting => {
                    groupedData = {
                        ...groupedData,
                        [_meeting.date]: [...(groupedData?.[_meeting.date] ?? []), { ..._meeting }],
                    }
                })
                return groupedData
            } else if (filter.groupBy === 'name') {
                // Group by Name
                let groupedData: GroupedDataType = {}
                meetings.forEach(_meeting => {
                    groupedData = {
                        ...groupedData,
                        [_meeting.name]: [...(groupedData?.[_meeting.name] ?? []), { ..._meeting }],
                    }
                })
                return groupedData
            }
        }
        return {}
    }, [filter.groupBy, meetings])

    return (
        <div className={clsx(classes.wrapper)}>
            <Card className={clsx(classes.listWrapper)}>
                <WrappedSuspense>
                    <CardContent>
                        <Typography variant="h5">Hi {emailId}</Typography>
                        <Typography className={classes.title} variant="body1" color="textSecondary">
                            Your visits
                        </Typography>
                        <Logout />
                        <div className={clsx('flex flex-row justify-between', classes.filterWrapper)}>
                            <Input placeholder="Search..." value={searchText} onChange={handleSearch} />
                            <IconButton onClick={toggleFilterView}>
                                <Icon>filter_list</Icon>
                            </IconButton>
                            <WrappedSuspense>
                                {isFilterOpen ? <Filter filter={filter} handleFilter={handleFilter} clearFilters={handleClearFilter} onClose={toggleFilterView} /> : null}
                            </WrappedSuspense>
                        </div>
                        {
                            // When no data show a message
                            filteredData.length === 0 && <NoData />
                        }
                        {/* Show grouped data if groupBy is selected */}
                        {filter.groupBy ? (
                            <GroupedListItem groupedData={groupedData} />
                        ) : (
                            filteredData.map(_meeting => {
                                return <ListItem key={_meeting.id} {..._meeting} />
                            })
                        )}
                    </CardContent>
                </WrappedSuspense>
            </Card>
            <IconButton color="primary" className={clsx(classes.button)} onClick={openAddMeeting}>
                <Icon>add</Icon>
            </IconButton>
        </div>
    )
}

export default memo(List)
