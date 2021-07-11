import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { resetData } from 'store/actions'

const useStyles = makeStyles({
    button: {
        position: 'fixed',
        top: 10,
        right: 10,
    },
})

function Logout(): JSX.Element {
    const classes = useStyles()
    const dispatch = useDispatch()

    function logout() {
        dispatch(resetData())
    }

    return (
        <div>
            <IconButton className={clsx(classes.button)} onClick={logout}>
                <Icon>logout</Icon>
            </IconButton>
        </div>
    )
}

export default Logout
