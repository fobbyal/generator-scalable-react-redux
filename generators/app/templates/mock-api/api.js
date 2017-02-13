/*eslint-env node */
const yargs = require('yargs')
const express = require('express')
const bodyParser = require('body-parser')
const mockJson = require('./json/mock.json')
const uuid = require('uuid/v4')

// import R from 'ramda';
// import moment from 'moment';
const cors = require('cors')
// //import log from 'loglevel';

// const log = { debug: console.log };

const argv = yargs
  .help('help').alias('help','h')
  .version('0.0.1','version').alias('version','v')
  .options({
    host: {
      description: '<host-name or ip>',
      default: 'localhost',
      type:'string'
    },
    mockPort: { description: '<port that the mock api is run on>',
      default:9898,
      type: 'string'
    }
  }).argv

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended:true }))

router.get('/test', (req, res) => {
  const data = Object.assign( mockJson,{ id:uuid(), date:new Date() })
  res.send(mockJson)
})

const app = express()
app.use(cors())
app.use('/api',router)
const port = argv.mockPort
const host = argv.host

app.listen(port,host,err => {
  if (err) {
/* eslint-disable no-console*/
    console.log(err)
    return
  }
  console.log(`mock-api server Listening at http://${host}:${port}`)
/* eslint-enable no-console*/
/* eslint-e no-console*/
})
