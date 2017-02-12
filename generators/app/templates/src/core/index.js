import localReducer from './reducer'
import { NAME } from './constants'

export const reducers = {
  [NAME]: localReducer
}

export default { NAME , reducers }
