import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../rootReducer'

export default function configureStore(initialState) {

  const enhancer = compose( 
    applyMiddleware(thunkMiddleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' 
      ? window.devToolsExtension() 
      : f => f,
    )

  const store = createStore(reducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../rootReducer', () => {
        const updatedReducers =  require('../rootReducer').default
        store.replaceReducer(updatedReducers)
      }
    )
  }

  return store
}
