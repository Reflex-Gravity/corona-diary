/* eslint-disable no-console */
type StorageType = 'sessionStorage' | 'localStorage'

/**
 * set data to Storage
 *
 * @param {'localStorage'|'sessionStorage'} type type of Storage
 * @param {string} key
 * @param {*} data Data to set for the key, Objects will be stringified
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function setStorageData(type: StorageType, key: string, data: any): void {
    try {
        let serializedData = data

        if (typeof data === 'object') {
            serializedData = JSON.stringify(data)
        }

        window[type].setItem(key, serializedData)
    } catch (er) {
        console.error(`setStorageData::Error in setting ${type}`)
    }
}

/**
 * get data from Storage
 *
 * @param {'localStorage'|'sessionStorage'} type type of Storage
 * @param {string} key
 * @returns
 */
export function getStorageData(type: StorageType, key: string): any {
    try {
        const serializedData = window?.[type].getItem(key)

        if (serializedData === null) return undefined

        return serializedData
    } catch (er) {
        console.error(`getStorageData::Error in getting ${type}`)
        return undefined
    }
}

/**
 * remove an item from Storage
 *
 * @static
 * @param {'localStorage'|'sessionStorage'} type type of Storage
 * @param {string} key
 */
export function removeStorageData(type: StorageType, key: string): void {
    try {
        window[type].removeItem(key)
    } catch (er) {
        console.error(`removeStorageData::Error in ${type}`, er)
    }
}
