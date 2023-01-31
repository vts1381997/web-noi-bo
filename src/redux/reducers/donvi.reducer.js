import { FETCH_DONVI } from '@constants'

const initialState = {
    source: {}
}

export default function todoUnit (state = initialState, action) {
    switch(action.type) {
        case FETCH_DONVI: {
            return Object.assign({}, state , {source: action.payload});  
        }
        default:
            return state;
    }
}