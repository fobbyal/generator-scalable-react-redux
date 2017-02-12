/* eslint-env jest */
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import * as actionNames from './action-names'
import * as actions from './actions'
import moment from 'moment'
import { NAME } from './constants'

jest.useFakeTimers()

const mockStore = configureStore([thunkMiddleware])

const allUnitGroups = { text:'All Unit Groups', value:'ALL' }
export const initialState = { 
  [NAME]:{
    unitMap:{},
    pspkUrl:'http://localhost:9898',
    unitGroups:{ 
      selected:'ALL', 
      groupToUnitMap: {},
      groupList : [allUnitGroups],
    }
  }
}

it('should dispatch STORE_UNIT_IDS', () => {
  const store = mockStore(initialState)
  return store.dispatch(actions.retrieveUnitList(moment().startOf('d')))
  .then(() => {
      const actualActions = store.getActions()
      //console.log(actualActions.length)
      expect(actualActions[0].type).toBe(actionNames.STORE_UNIT_MAP)
			//expect(Object.keys(actualActions[0].payload).length).toBeGreaterThan(0)
      expect(actualActions[1].type).toBe(actionNames.STORE_UNIT_IDS)
      //console.log(actualActions[1].payload.data.length).toBeGreaterThan(0)
			expect(actualActions[1].payload.data.length).toBeGreaterThan(0)
  })
})

it('should dispatch STORE_CALC_SCHEDULES', () => {
  const store = mockStore(initialState)
  return store.dispatch(actions.retrieveCalcSchedules(moment().startOf('d')))
  .then(() => {
      const actualActions= store.getActions()
      expect(actualActions[0].type).toBe(actionNames.STORE_CALC_SCHEDULES)
			expect(actualActions[0].payload.length).toBeGreaterThan(0)
  })
})

it('should fire SET_UNIT_FUZZY_FILTER properly', () => {
  const store = mockStore(initialState)
  store.dispatch(actions.setFuzzyUnitFilter('ABC'))
  const actualActions = store.getActions()
  jest.runAllTimers()
  expect(actualActions[0].type).toBe(actionNames.SET_FILTER_ADJUSTING)
  expect(actualActions[0].payload).toBe(true)
  expect(actualActions[1].type).toBe(actionNames.SET_UNIT_FUZZY_FILTER)
  expect(actualActions[1].payload).toBe('ABC')
  expect(actualActions[2].type).toBe(actionNames.SET_FILTER_ADJUSTING)
  expect(actualActions[2].payload).toBe(false)
})

it('should fire SET_AVAILBLE_SCHEDULE_ONLY true', () => {
  const store = mockStore(initialState)
  store.dispatch(actions.setAvailableScheduleOnly(true))
  const actualActions = store.getActions()
  jest.runAllTimers()
  expect(actualActions[0].type).toBe(actionNames.SET_FILTER_ADJUSTING)
  expect(actualActions[0].payload).toBe(true)
  expect(actualActions[1].type).toBe(actionNames.SET_AVAILBLE_SCHEDULE_ONLY)
  expect(actualActions[1].payload).toBe(true)
  expect(actualActions[2].type).toBe(actionNames.SET_FILTER_ADJUSTING)
  expect(actualActions[2].payload).toBe(false)
})

it('should fire SET_AVAILBLE_SCHEDULE_ONLY false', () => {
  const store = mockStore(initialState)
  store.dispatch(actions.setAvailableScheduleOnly(false))
  const actualActions = store.getActions()
  jest.runAllTimers()
  expect(actualActions[0].type).toBe(actionNames.SET_FILTER_ADJUSTING)
  expect(actualActions[0].payload).toBe(true)
  expect(actualActions[1].type).toBe(actionNames.SET_AVAILBLE_SCHEDULE_ONLY)
  expect(actualActions[1].payload).toBe(false)
  expect(actualActions[2].type).toBe(actionNames.SET_FILTER_ADJUSTING)
  expect(actualActions[2].payload).toBe(false)
})
