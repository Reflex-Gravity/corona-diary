export type HandleDateChangeType = {
    type: 'fromDate' | 'toDate',
    date: number,
}

export type DateRangeType = {
    fromDate: FilterType['fromDate'],
    toDate: FilterType['toDate'],
    handleDateChange: (type: HandleDateChangeType['type'], date: HandleDateChangeType['date']) => void,
}
