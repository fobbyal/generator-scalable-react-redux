import localReducer from './reducer'
import { NAME } from './constants'
import Container,{ navs } from './container/Container'

const reducers = {
  [NAME]: localReducer
}

export { reducers, NAME, navs , Container }
export default { reducers, NAME, navs , Container }
