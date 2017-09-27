import R from 'ramda'
import Task, { rejected } from 'data.task'
import { futurizeP } from 'futurize'
import { fromNullable, Just, Nothing } from 'data.maybe'

const future = futurizeP(Task)
const futurizedFetch = future(fetch)
const url = ({ baseUrl }, target) => `${baseUrl}/${target}`

const httpErrorTask = resp => {
  /*eslint-disable*/
  console.log(
    'raw Error',
    resp,
    'content-type is ',
    resp.headers.get('Content-Type')
  )
  /*eslint-enable*/
  if (
    R.isNil(resp.headers.get('Content-Type')) ||
    resp.headers.get('Content-Type').includes('text')
  ) {
    const { status, statusText } = resp
    return new Task((reject, resolve) =>
      resp
        .text()
        .then(err =>
          reject({
            restfulStatus: status,
            errorMsg: statusText,
            stackTrace: `${statusText}\n${err}`,
            targetUrl: resp.url,
            httpError: true,
          })
        )
        .catch(reject)
    )
  }
  if (resp.headers.get('Content-Type').includes('json')) {
    return new Task((reject, resolve) =>
      resp
        .json()
        .then(e => reject({ ...e, targetUrl: resp.url }))
        .catch(reject)
    )
  }
  return rejected(resp)
}

const processHttpResp = resp =>
  resp
    .chain(res => (res.status === 200 ? Task.of(res) : httpErrorTask(res)))
    .chain(
      res =>
        new Task((reject, success) =>
          res
            .json()
            .then(success)
            .catch(reject)
        )
    )

const fetchAndHandleError = R.compose(processHttpResp, futurizedFetch)
const authHeader = ({ jwt }) => (jwt ? { Authorization: `JWT ${jwt}` } : {})

export const post = (targetInfo, target) => payload =>
  fetchAndHandleError(url(targetInfo, target), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(targetInfo),
    },
    body: fromNullable(payload)
      .map(JSON.stringify)
      .getOrElse(undefined),
  })

export const get = (targetInfo, target) =>
  fetchAndHandleError(url(targetInfo, target), {
    headers: authHeader(targetInfo),
  })
