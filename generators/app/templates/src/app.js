import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import 'whatwg-fetch'
import debounce from 'debounce'
import Redbox from 'redbox-react'

/* eslint-disable import/no-unresolved */
require('!!style-loader!css-loader!normalize.css/normalize.css')
//require('!!style-loader!css-loader!react-virtualized/styles.css')
require('!!style-loader!css-loader!react-datepicker/dist/react-datepicker.css')
//require('!!style-loader!css-loader!semantic-ui-css/semantic.min.css')
/* eslint-enable import/no-unresolved */

/**need code here to get initial state need to how how get the previous state from java**/
const rootEl = document.getElementById('root')

const store = configureStore({
  'core':{ 
    apiUrl:'http://localhost:9898'
  }
})


/** this is here because auto reload won't wor if require action */
const WINDOW_SIZE_CHANGE = 'core@@WINDOW_SIZE_CHANGE'
export const changeScreenSize = win => ({
  type:WINDOW_SIZE_CHANGE,
  payload:{
    width: win.innerWidth,
    height: win.innerHeight
  }
})


if(window) {
   //** need to de bounce this event***/
   /* eslint-disable no-console*/
  console.log('registering window size....')
  const windowSizeListener =
    debounce(
      e => store.dispatch(changeScreenSize(e.target)),
      300
    )
  window.addEventListener('resize',windowSizeListener)
  store.dispatch(changeScreenSize(window))
   /* eslint-enable no-console*/
}


const renderApp= (Content,element) => {


  ReactDOM.render(
      <AppContainer errorReporter={Redbox} >
        <Provider store={store}>
          <Content/>
        </Provider>
      </AppContainer>,
      element)
}

const loadApp = () => renderApp(require('./Dashboard.js').default,rootEl)

loadApp()

if(module.hot) {
  module.hot.accept('./Dashboard.js',() => {
    loadApp()
  })
}
