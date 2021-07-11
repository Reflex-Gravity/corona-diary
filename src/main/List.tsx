import React, { lazy, memo, useEffect, useState } from 'react'
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

const Filter = lazy(() => import('./components/Filter'))
const GroupedListItem = lazy(() => import('./components/GroupedListItem'))

const useStyles = makeStyles({
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
        position: 'sticky',
        bottom: 10,
        left: '100%',
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            color: '#333',
            backgroundColor: '#aaa',
        },
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
    }, [emailId])

    function handleSearch(evt: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(evt.target.value)
    }

    function openAddMeeting() {
        history.push('/add-meeting')
    }

    function toggleFilterView() {
        setFilterOpen(!isFilterOpen)
    }

    function handleFilter(type: string, newFilter: FilterType['fromDate'] | FilterType['toDate'] | FilterType['groupBy']) {
        const updatedFilter = {
            ...filter,
            [type]: newFilter,
        }
        setFilter(updatedFilter)
    }

    const groupByData = () => {
        if (filter.groupBy) {
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
    }

    const filteredData = meetings.filter(_data => {
        if (_data.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
            return _data
        }
    })

    const groupedData = groupByData()

    return (
        <Card className={clsx(classes.listWrapper)}>
            <WrappedSuspense>
                <CardContent>
                    <Typography variant="h5">Hi {emailId}</Typography>
                    <Typography className="mt-5" variant="h6">
                        Your visits
                    </Typography>
                    <Logout />
                    <div className={clsx('flex flex-row justify-between', classes.filterWrapper)}>
                        <Input placeholder="Search..." value={searchText} onChange={handleSearch} />
                        <IconButton onClick={toggleFilterView}>
                            <Icon>filter_list</Icon>
                        </IconButton>
                        <WrappedSuspense>{isFilterOpen ? <Filter filter={filter} handleFilter={handleFilter} onClose={toggleFilterView} /> : null}</WrappedSuspense>
                    </div>
                    {
                        // When no data show a message
                        filteredData.length === 0 && <NoData />
                    }
                    {filter.groupBy ? (
                        <GroupedListItem groupedData={groupedData} />
                    ) : (
                        filteredData.map(_meeting => {
                            return <ListItem key={_meeting.id} {..._meeting} />
                        })
                    )}

                    <IconButton color="primary" className={clsx(classes.button)} onClick={openAddMeeting}>
                        <Icon>add</Icon>
                    </IconButton>
                </CardContent>
            </WrappedSuspense>
        </Card>
    )
}

export default memo(List)
