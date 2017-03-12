const path = require('path')
const Task = require('data.task')
const fs = require('fs')
const Either = require('data.either')

const read = path =>
  new Task((reject,resolve) =>
    fs.readFile(path,'utf-8',
      (err,data) => err ? reject(err) : resolve(data)
     )
)

const write = path => data =>
  new Task((reject,resolve) =>
    fs.writeFile(path,data,'utf-8',
      (err) => err ? reject(err) : resolve()
     )
   )




const treeModder = modder => ast => {
  modder(ast)
  return ast
}

const toSource = ast => ast.toSource()

exports.read = read

exports.treeModder = treeModder

exports.toSource = toSource

const backupFile = (file , bak) => {
  fs.createReadStream(file)
    .pipe(fs.createWriteStream(bak))
  return bak
}

exports.backupFile = Either.try(backupFile)
exports.write = write
