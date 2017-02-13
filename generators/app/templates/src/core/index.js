import localReducer from './reducer'
import { NAME } from './constants'
import Container,{ navs } from './container/Container'
import { action } from './actions.js'

const reducers = {
  [NAME]: localReducer
}

export { reducers, NAME, navs , Container, action }
export default { reducers, NAME, navs , Container, action }
