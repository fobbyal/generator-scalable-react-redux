import * as api from 'api/api'

import * as ANS from './action-names'

import {
    getApiTargetInfo
} from './selectors'

export const action = (type, payload) => ({ type, payload })

export const retrieveDummyData = () => (dispatch, getState) => {
    const targetInfo = getApiTargetInfo(getState())
    const updateData = data => dispatch(action(ANS.STORE_DUMMY_DATA, data))
    return api.getTest(targetInfo)()
        /*eslint-disable no-console*/
        .fork(console.log, updateData)
        /*eslint-enable no-console */
}

export const storeApiUrl = url => action(ANS.STORE_API_URL, url)