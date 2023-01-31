import { FETCH_USER } from '@constants'



const initialState = {
    pageNumber: 1,
    current: 1,
    page: 1,
    pageSize: 10,
}

export default function todoUser (state = initialState, action) {
    switch(action.type) {
        case FETCH_USER: {
            return Object.assign({}, state , {pageSize: action.payload.pageSize});  
        }
        default:
            return state;
    }
}