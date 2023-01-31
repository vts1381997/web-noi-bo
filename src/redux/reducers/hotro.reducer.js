import { FETCH_HOTRO } from '@constants'

const initialState = {
    
    hotro:{x:'5'}
}

export default function todoHotro (state = initialState, action) {
    switch(action.type) {
        case FETCH_HOTRO: {
            return Object.assign({}, state , {loading: action.payload.loading});  
        }
        default:
            return state;
    }
}