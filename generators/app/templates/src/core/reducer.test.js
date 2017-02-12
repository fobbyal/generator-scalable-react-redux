/* eslint-env jest */
import * as selectors from './selectors'
import localReducer from './reducer'
import { action  }from './actions'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  [NAME] : localReducer
})

import {
  STORE_SAPRK_API_URL,
  SET_UNIT_GROUP_FILTER,
  SET_SCHEDULE_TYPE_FITLER,
  STORE_UNIT_GROUPS,
} from './action-names'

it('should filter units properly', () => {

  const unitMap =require('mock-json/unitsNameMap.json')
  const unitIds =require('mock-json/unitIds.json')
  const unitGroups=require('mock-json/unitsGroups.json')
  let state = {}
  state = reducer(state, action(STORE_UNIT_IDS,{ data:unitIds, unitMap }))
  state = reducer(state, action(STORE_UNIT_MAP,unitMap))
  state = reducer(state, action(STORE_UNIT_GROUPS,unitGroups))

  const totalLength = selectors.getFilteredUnitList(state).length
  expect(totalLength).toBeGreaterThan(0)

  state = reducer(state, action(SET_UNIT_GROUP_FILTER,'GAS'))
  const gasLength = selectors.getFilteredUnitList(state).length
  expect(gasLength).toBeGreaterThan(0)
  expect(gasLength).toBeLessThan(totalLength)

  state = reducer(state, action(SET_UNIT_GROUP_FILTER,'ALL'))
  state = reducer(state, action(SET_UNIT_FUZZY_FILTER,'ch'))

  const fuzzyLength = selectors.getFilteredUnitList(state).length
  expect(fuzzyLength).toBeGreaterThan(0)
  expect(fuzzyLength).toBeLessThan(totalLength)

  state = reducer(state, action(SET_UNIT_GROUP_FILTER,'GAS'))
  state = reducer(state, action(SET_UNIT_FUZZY_FILTER,'ddd'))
  
  const combinedLength = selectors.getFilteredUnitList(state).length
  expect(combinedLength).toBe(0)

})

it('STORE_UNIT_MAP reducer should work properly', () => {

  let actual = selectors.getUnitMap(reducer({}, action('@@INIT@@')))
  let expected = {}
  expect(actual).toEqual(expected)

  expected = { 
    1234232:'ww'
  }
  actual = selectors.getUnitMap(reducer({}, action(STORE_UNIT_MAP,expected)))
  expect(actual).toBe(expected)
})

it('should STORE_UNIT_GROUPS properly', () => {
  expect(
    selectors.getUnitGroupList(reducer({},action('@@INIT@@'))).length
  ).toBe(1)

  const results = require('mock-json/unitsGroups.json')
  expect(
    selectors.getUnitGroupList(reducer({},action(STORE_UNIT_GROUPS,results))).length
  ).toBe(5)

})

it('STORE_UNIT_IDS reducer should work properly', () => {

  const empty = selectors.getUnitIds(reducer({}, action('@@INIT@@')))
  let expected = []
  expect(empty).toEqual(expected)

  const unitMap = {
    '1234':'b',
    '2234':'a'
  }
  const data = ['1234','2234']

  expected = ['2234','1234']

  const actual = selectors.getUnitIds(reducer({}, action(STORE_UNIT_IDS,{ data,unitMap })))
  expect(actual).toEqual(expected)
})

it('STORE_CALC_SCHEDULES reducer should work properly', () => {

  let actual = selectors.getSchedules(reducer({}, action('@@INIT@@')))
  let expected = []
  expect(actual).toEqual(expected)

  expected = ['2341132324','13432143']

  actual = selectors.getSchedules(reducer({}, action(STORE_CALC_SCHEDULES ,expected)))
  expect(actual).toBe(expected)
})

it('SET_UNIT_FUZZY_FILTER reducer should work properly', () => {
  let actual = selectors.getUnitFilter(reducer({}, action('@@INIT@@')))
  expect(actual).toBe('')
  actual = selectors.getUnitFilter(reducer({}, action(SET_UNIT_FUZZY_FILTER,'ABC')))
  expect(actual).toBe('ABC')
  actual = selectors.getUnitFilter(reducer({}, action(SET_UNIT_FUZZY_FILTER,' def ')))
  expect(actual).toBe('def')
  actual = selectors.getUnitFilter(reducer({}, action(SET_UNIT_FUZZY_FILTER,null)))
  expect(actual).toBe('')
})

it('should SET_AVAILBLE_SCHEDULE_ONLY', () => {
  let actual = selectors.isAvailableScheduleOnly(reducer({}, action('@@INIT@@')))
  expect(actual).toBe(false)
  actual = selectors.isAvailableScheduleOnly(reducer({}, action(SET_AVAILBLE_SCHEDULE_ONLY,true)))
  expect(actual).toBe(true)
  actual = selectors.isAvailableScheduleOnly(reducer({}, action(SET_AVAILBLE_SCHEDULE_ONLY,false)))
  expect(actual).toBe(false)
})
it('should SET_SCHEDULE_TYPE_FITLER', () => {
  let actual = selectors.getScheduleTypeFilter(reducer({}, action('@@INIT@@')))
  expect(actual).toBe(ALL_SCHEDULES)
  actual = selectors.getScheduleTypeFilter(reducer({}, action(SET_SCHEDULE_TYPE_FITLER,PLS)))
  expect(actual).toBe(PLS)
  actual = selectors.getScheduleTypeFilter(reducer({}, action(SET_SCHEDULE_TYPE_FITLER,COST)))
  expect(actual).toBe(COST)
  actual = selectors.getScheduleTypeFilter(reducer({}, action(SET_SCHEDULE_TYPE_FITLER,PRICE)))
  expect(actual).toBe(PRICE)
  actual = selectors.getScheduleTypeFilter(reducer({}, action(SET_SCHEDULE_TYPE_FITLER,ALL_SCHEDULES)))
  expect(actual).toBe(ALL_SCHEDULES)
})
it('should SET_UNIT_GROUP_FILTER', () => {
  let actual = selectors.getUnitGroupFilter(reducer({}, action('@@INIT@@')))
  expect(actual).toBe('ALL')
  actual = selectors.getUnitGroupFilter(reducer({}, action(SET_UNIT_GROUP_FILTER,'STEAM')))
  expect(actual).toBe('STEAM')
  actual = selectors.getUnitGroupFilter(reducer({}, action(SET_UNIT_GROUP_FILTER,'CT')))
  expect(actual).toBe('CT')
})
