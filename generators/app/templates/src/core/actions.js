import * as pspk from 'api/pspk'

import {
  STORE_API_URL,
} from './action-names'

export const action = (type,payload) => ({
  type,
  payload
})

export const retrieveTest = () => (dispatch,getState) => {
  const targetInfo = getPspkTargetInfo(getState())
  return pspk.getTest(targetInfo)()
  .then(data => data.json())
  .then(map => dispatch(action(STORE_UNIT_MAP,map)))
  return new Promise(resolve => resolve(map))
}
