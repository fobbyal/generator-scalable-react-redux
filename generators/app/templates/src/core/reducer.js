import { combineReducers } from 'redux'
import R from 'ramda'
import { 
  STORE_API_URL,
} from './action-names'

const apiUrl = (state = 'http://localhost:9898' , action ) => {
  switch(action.type) {
    case STORE_SAPRK_API_URL:
      return action.payload
  }
  return state
}

const dummyData = (state = {} , action ) => {
  switch(action.type) {
    case :
      return action.payload
  }
  return state
}

export default combineReducers({ 
  apiUrl,
  dummyData
})

