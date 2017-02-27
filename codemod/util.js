const path = require('path')
const Task = require('data.task')
const fs = require('fs')

const read = path =>
  new Task((reject,resolve) =>
    fs.readFile(path,'utf-8',
      (err,data) => err ? reject(err) : resolve(data)
     )
   )


const filePath =  path.join(
  __dirname,
  '..',
  'generators',
  'app',
  'templates',
  'src',
  'Dashboard.js'
)

exports.read = read
exports.testFile = filePath

