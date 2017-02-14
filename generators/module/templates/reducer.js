import { combineReducers } from 'redux'
import R from 'ramda'
/*
import { 
} from './action-names'
*/


/* to be removed */
const dummy= (state ='dummmy' , action ) => {
  switch(action.type) {
    case 'DUMMY':
      return action.payload
  }
  return state
}


export default combineReducers({ 
  dummy
})

