import { FETCH_LOADING } from '@constants'


export const fetchLoading = (data) => {
    return {
        type: FETCH_LOADING,
        payload: data
    }
}