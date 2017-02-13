import { createStore, combineReducers, applyMiddleware,compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from '../rootReducer'

const enhancer = applyMiddleware(thunkMiddleware)
//const finalReducer = combineReducers({ ...reducers, routing: routerReducer });

//const createRootReducer = rds => combineReducers({ ...rds, routing: routerReducer })

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, enhancer)
  return store
}
