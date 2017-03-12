const jscodeshift = require('jscodeshift')
const t = jscodeshift
const b = jscodeshift
const { read,testFile } = require('./util')

const renameNavs = ast => ast
  .findVariableDeclarators('navs')
    .renameTo('bar')

const treeModder = modder => ast => {
  modder(ast)
  return ast
}

const addNav = treeModder( ast => 
   ast.findVariableDeclarators('navs')
  .find(t.ArrayExpression)
  .get('elements')
  .push(b.identifier('abc'))
)

const addContainer = treeModder( ast => 
   ast.findVariableDeclarators('Containers')
  .find(t.ArrayExpression)
  .get('elements')
  .push(b.identifier('def'))
)

const addImport = treeModder( ast =>  {
 // onsole.ast)
    const mockImport = b.importDeclaration(
      [ 
        b.importSpecifier(
          b.identifier('Imported'),
          b.identifier('Local')
        ),
      ] ,
      b.literal('/remote/pakcage')
    )
   ast.find(t.Program)
   .get('body').unshift(mockImport)

  }
)


const toSoruce = ast =>
  ast.toSource()

read(testFile)
  .map(jscodeshift)
  // .map(addNav)
  // .map(addContainer)
  .map(addImport)
  .map(toSoruce)
  .fork(err => console.log('error: ',err.stack), 
        //data => console.log('done..')
        data => console.log('recast output :\n',data) 
  )
