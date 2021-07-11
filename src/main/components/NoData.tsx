import React, { memo } from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    noData: {
        marginTop: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

function NoData() {
    const classes = useStyles()

    return (
        <Typography className={classes.noData} color="initial">
            No Data.
        </Typography>
    )
}

export default memo(NoData)
