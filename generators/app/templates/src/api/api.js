import R from 'ramda'
import { post, get } from './utils'

//const baseUrl='http://localhost:9898'

const toDate = moment => moment.format('YYYY-MM-DD')

export const getTest = targetInfo => () => get(targetInfo, 'test')