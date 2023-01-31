import { FETCH_HOTRO } from '@constants'


export const fetchHotro = (data) => {
    return {
        type: FETCH_HOTRO,
        payload: data
    }
}
