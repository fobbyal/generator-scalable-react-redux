/* eslint-env jest */
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import * as actionNames from './action-names'
import * as actions from './actions'
import { NAME } from './constants'

jest.useFakeTimers()

const mockStore = configureStore([thunkMiddleware])

const allUnitGroups = { text:'All Unit Groups', value:'ALL' }
export const initialState = { 
  [NAME]:{}
}

it('should replace this file and write proper tests', () => {

})


