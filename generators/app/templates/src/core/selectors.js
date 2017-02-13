import { NAME } from './constants'
import R from 'ramda'
const getState = state => state[NAME]
import { fromNullable } from 'data.maybe'

export const getApiTargetInfo =  R.compose(state => state.apiTargetInfo, getState)
export const getDummyData =  R.compose(state => state.dummyData, getState)
export const getScreenSize = R.compose( state => state.screenSize, getState)
