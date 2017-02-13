import { combineReducers } from 'redux'
import R from 'ramda'
import { 
  STORE_API_URL,
  WINDOW_SIZE_CHANGE,
  STORE_DUMMY_DATA,
} from './action-names'


/* to be removed */
const dummyData = (state = {} , action ) => {
  switch(action.type) {
    case STORE_DUMMY_DATA:
      return action.payload
  }
  return state
}

const screenSize = (state = { width:0,height:0 } , action ) => {
  switch(action.type) {
    case WINDOW_SIZE_CHANGE:
      return action.payload
  }
  return state
}

const apiTargetInfo = (state = { baseUrl:'http://localhost:9898' } , action ) => {
  switch(action.type) {
    case STORE_API_URL:
      return { ...state,baseUrl: action.payload }
  }
  return state
}

export default combineReducers({ 
  apiTargetInfo,
  /* to be removed */
  dummyData,
  screenSize,
})

