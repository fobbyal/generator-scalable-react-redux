/* eslint-env jest */
import { 
  getTest ,
} from 'api/api'

import moment from 'moment'

const targetInfo = {
  baseUrl:'http://localhost:9898',
}

it('unit map should retrieve properly', () => 
  getTest(targetInfo)()
    .then(data => data.json())
    .then(data => {
      //todo: better matchers
      expect(data).not.toBeNull()
      expect(Object.keys(data).length).toBeGreaterThan(0)
    })
)

