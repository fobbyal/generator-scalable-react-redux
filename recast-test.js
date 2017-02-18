const recast = require('recast')
const fs = require('fs')
const Task = require('data.task')
const path = require('path')
const R = require('ramda')
const n = recast.types.namedTypes
const b = recast.types.builders



const read = path =>
  new Task((reject,resolve) =>
    fs.readFile(path,'utf-8',
      (err,data) => err ? reject(err) : resolve(data)
     )
   )


const astToCode = ast => recast.print(ast).code


const filePath =  path.join(
  __dirname,
  'generators',
  'app',
  'templates',
  'src',
  'Dashboard.js'
)

const process = ast => {
  // recast.visit(ast,{
  //   visitArrowFunctionExpression: function(path) {
  //     console.log(path.node)
  //     this.traverse(path)
  //   }
  // })
  //console.log(ast.program.body[0])
  console.log(R.keys(b).filter(key => key.includes('import')))
  const mockImport = b.importDeclaration(
    [ 
      b.importSpecifier(
        b.identifier('Imported'),
        b.identifier('Local')
      ),
    ] ,
    b.literal('/remote/pakcage')
  )
  ast.program.body.unshift(mockImport)

  return ast
}



read(filePath)
  .map(recast.parse)
  .map(process)
  .map(astToCode)
  .fork(err => console.log('error: ',err.stack), 
       // data => console.log('done..')
        data => console.log('recast output :\n',data) 
  )

