const recast = require('recast')
const R = require('ramda')
const n = recast.types.namedTypes
const b = recast.types.builders
const { read,testFile }= require('./util')

const astToCode = ast => recast.print(ast).code



const process = ast => {
  // recast.visit(ast,{
  //   visitArrowFunctionExpression: function(path) {
  //     console.log(path.node)
  //     this.traverse(path)
  //   }
  // })
  //console.log(ast.program.body[0])
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



read(testFile)
  .map(recast.parse)
  .map(process)
  .map(astToCode)
  .fork(err => console.log('error: ',err.stack), 
       // data => console.log('done..')
        data => console.log('recast output :\n',data) 
  )

