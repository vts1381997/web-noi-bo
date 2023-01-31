import { combineReducers } from 'redux'

import  todoUser  from '@reducers/user.reducer'
import  todoHotro  from '@reducers/hotro.reducer'
import  todoCommon  from '@reducers/common.reducer'

const rootReducer = combineReducers({
    todoUser,
    // todoHotro,
    todoCommon
  })
  
  export default rootReducer