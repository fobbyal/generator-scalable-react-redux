import fetchMock from 'fetch-mock'

// const prefix = /http:\/\/[\w\.:\/]+/

// const url = target => new RegExp(prefix.source+target.source)

fetchMock.get(/test/,require('mock-json/mock.json'))
