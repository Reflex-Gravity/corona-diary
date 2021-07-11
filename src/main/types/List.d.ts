import { Meetings } from 'store/types'

export interface GroupedDataType {
    [name: string]: Meetings[];
}
export type FilterType = {
    groupBy: string,
    fromDate: number | null,
    toDate: number | null,
}
