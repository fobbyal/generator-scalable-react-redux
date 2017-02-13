import * as api from 'api/api'

import {
  STORE_API_URL,
  STORE_DUMMY_DATA,
} from './action-names'

import {
  getApiTargetInfo
} from './selectors'

export const action = (type,payload) => ({ type, payload })

export const retrieveDummyData = () => (dispatch,getState) => {
  const targetInfo = getApiTargetInfo(getState())
  return api.getTest(targetInfo)()
  .then(data => data.json())
  .then(map => dispatch(action(STORE_DUMMY_DATA,map)))
  .catch(e => console.log(e,e.stack))
}

export const storeApiUrl = url => action(STORE_API_URL,url)
