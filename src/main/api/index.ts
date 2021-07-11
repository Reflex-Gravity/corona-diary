export function getPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        // check for browser support
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'))
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                resolve(position)
            },
            error => {
                reject(error)
            },
            options
        )
    })
}
