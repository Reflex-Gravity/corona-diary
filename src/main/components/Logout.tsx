import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { resetData } from 'store/actions'
import { Tooltip } from '@material-ui/core'

const useStyles = makeStyles({
    button: {
        position: 'fixed',
        top: 10,
        backgroundColor: '#3f51b5',
        color: '#fff',
        right: 10,
        '&:hover': {
            color: '#3f51b5',
            backgroundColor: '#fff',
        },
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
            <Tooltip title="Log out and reset">
                <IconButton className={clsx(classes.button)} onClick={logout}>
                    <Icon>logout</Icon>
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default Logout
