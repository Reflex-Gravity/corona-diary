import React, { useState } from 'react'
import { IconButton, Icon } from '@material-ui/core'
import { getPosition } from 'main/api'
import { Typography } from '@material-ui/core'

interface OnSelectFunc {
    (pos: GeolocationPosition): void;
}

type Props = {
    onSelect: OnSelectFunc,
}

function SearchPlaces({ onSelect }: Props): JSX.Element {
    const [error, setError] = useState(0)
    const [isLocating, setLocating] = useState(false)

    function getLocation() {
        setLocating(true)
        getPosition()
            .then((pos: GeolocationPosition) => {
                onSelect(pos)
            })
            .catch((er: GeolocationPositionError) => {
                setError(er.code)
            })
            .finally(() => {
                setLocating(false)
            })
    }

    return (
        <div>
            <IconButton size="small" onClick={getLocation}>
                <Icon>my_location</Icon>
            </IconButton>
            {isLocating && <Typography>Locating...</Typography>}
            <Typography className="text-red">{error === 1 && 'Check your location permission.'}</Typography>
        </div>
    )
}

export default SearchPlaces
