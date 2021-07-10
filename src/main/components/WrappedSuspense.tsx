import React, { Suspense } from 'react'
import { Typography } from '@material-ui/core'

type Props = {
    children: JSX.Element,
}

function WrappedSuspense(props: Props): JSX.Element {
    return <Suspense fallback={<Typography id="loader">Loading...</Typography>}>{props.children}</Suspense>
}

export default WrappedSuspense
