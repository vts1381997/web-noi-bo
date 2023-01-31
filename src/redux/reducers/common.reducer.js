import { FETCH_LOADING } from '@constants'



const initialState = {
    loading: false,
    user: {}
}

export default function todoCommon (state = initialState, action) {
    switch(action.type) {
        case FETCH_LOADING: {
            return Object.assign({}, state , {loading: action.payload.loading});  
        }
        default:
            return state;
    }
}