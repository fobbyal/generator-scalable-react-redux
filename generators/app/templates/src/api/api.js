import R from 'ramda'

//const baseUrl='http://localhost:9898'

const url = ({ baseUrl }, target) => {
  console.log('base url is',baseUrl)
  return   `${baseUrl}/api/${target}`
}

const toDate = moment => moment.format('YYYY-MM-DD')

/** need to put security info here **/
const post = (targetInfo, target) => payload => fetch(url(targetInfo,target), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

/** need to put security info here **/
const get = (targetInfo, target) =>
  fetch(url(targetInfo,target))

export const getTest = targetInfo => () => get(targetInfo,'test')
