import localReducer from './reducer'
import { NAME } from './constants'
import Container,{ navs } from './container/Container'
import { action } from './actions.js'
import ActiveLink from './component/ActiveLink'

const reducers = {
  [NAME]: localReducer
}

export { reducers, NAME, navs , Container, action, ActiveLink }
export default { reducers, NAME, navs , Container, action, ActiveLink }
