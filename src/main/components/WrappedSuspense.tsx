import React, { Suspense } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles({
    loader: {
        position: 'fixed',
        top: 10,
        right: 0,
        left: 0,
        margin: 'auto',
    },
})

type Props = {
    children: JSX.Element,
}

function WrappedSuspense(props: Props): JSX.Element {
    const classes = useStyles()

    return (
        <Suspense
            fallback={
                <Typography id="loader" className={clsx(classes.loader)}>
                    Loading...
                </Typography>
            }
        >
            {props.children}
        </Suspense>
    )
}

export default WrappedSuspense
