import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { setUser } from '../store/actions'
import { getStorageData, setStorageData } from './utils/storage.handler'

function Login(): JSX.Element {
    const [emailId, setEmailId] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const sessionEmailId = getStorageData('sessionStorage', 'sessionUser')
        if (sessionEmailId) {
            setEmailId(sessionEmailId)
            dispatch(setUser(sessionEmailId))
            history.push(`/list/`)
        }
    }, [dispatch, history])

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        setEmailId(evt.target.value)
    }

    function handleSubmit() {
        if (emailId) {
            setStorageData('sessionStorage', 'sessionUser', emailId)
            dispatch(setUser(emailId))
            history.push(`/list/`)
        }
    }

    return (
        <Card>
            <CardContent>
                <Typography>Your Name</Typography>
                <form role="form" className="flex flex-col login-form" action="">
                    <TextField className="w-full" label="Name" id="name" name="name" type="text" value={emailId} onChange={handleChange} />
                    <Button className="login-btn" role="button" color="primary" variant="contained" aria-label="Login" type="submit" onClick={handleSubmit}>
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default Login
