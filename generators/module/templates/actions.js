import { action } from 'core'

import {
  DUMMY_ACTION,
} from './action-names'

export const dummyAction = _ => action(DUMMY_ACTION,_)
/*
export const retrieveDummyData = () => (dispatch,getState) => {
  const targetInfo = getApiTargetInfo(getState())
  return api.getTest(targetInfo)()
  .then(data => data.json())
  .then(map => dispatch(action(STORE_DUMMY_DATA,map)))
  .catch(e => console.log(e,e.stack))
}
*/

