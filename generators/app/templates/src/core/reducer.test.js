/* eslint-env jest */
import * as selectors from './selectors'
import localReducer from './reducer'
import { action  }from './actions'
import { combineReducers } from 'redux'
import { NAME } from './constants'

const reducer = combineReducers({
  [NAME] : localReducer
})

it('should replace this test with proper tests', () => {

})

