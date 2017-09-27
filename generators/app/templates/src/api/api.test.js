/* eslint-env jest */
import {
    getTest,
} from 'api/api'
import Task, { rejected } from 'data.task'
import moment from 'moment'

const targetInfo = {
    baseUrl: 'http://localhost:9898',
}

const throwError = e => { throw e }

it('unit map should retrieve properly', done => {
    const verifyData = data => {
        expect(data).not.toBeNull()
        expect(Object.keys(data).length).toBeGreaterThan(0)
    }
    getTest(targetInfo)()
        .fork(throwError, done)
})