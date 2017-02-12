import { NAME } from './constants'
import R from 'ramda'
const getState = state => state[NAME]
import { fromNullable } from 'data.maybe'

export const getApiUrl =  R.compose(state => state.apiUrl, getState)
export const getDummyData =  R.compose(state => state.dummyData, getState)
