/* eslint-env mocha*/
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-react-redux-spa:app', () => {
  before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true })
      .toPromise()
  )

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ])
  })
})
