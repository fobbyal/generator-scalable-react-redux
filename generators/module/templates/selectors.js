import { NAME } from './constants'
import R from 'ramda'
import { fromNullable } from 'data.maybe'

const getState = state => state[NAME]

export const getDummy=  R.compose(state => state.dummy, getState)
