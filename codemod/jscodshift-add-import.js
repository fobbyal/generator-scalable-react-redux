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


const toSoruce = ast =>
  ast.toSource()

read(testFile)
  .map(jscodeshift)
  .map(addNav)
  .map(addContainer)
  .map(toSoruce)
  .fork(err => console.log('error: ',err.stack), 
       // data => console.log('done..')
        data => console.log('recast output :\n',data) 
  )
