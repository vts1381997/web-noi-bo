import { FETCH_USER } from '@constants'

export const fetchUser = (data) => {
    return {
        type: FETCH_USER,
        payload: data
    }
}