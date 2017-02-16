const babylon = require('babylon')
const generate = require('babel-generator').default
const fs = require('fs')
const path = require('path')
const traverse = require('babel-traverse').default
const t = require('babel-types')

const file = path.join(__dirname,'generators','app','templates','src','Dashboard.js')
console.log('file at ',file)


fs.readFile(file,'utf-8',(err,code) => {
  if(err) {
    console.log('cannot read file',err)
    return;
  }
  //console.log(' code is ',code)

  const ast = babylon.parse(code,{
    sourceType: 'module',
    plugins: [
      'jsx',
      'objectRestSpread',
    ]
  })


  const buildImport = (localName,imported,source) =>
  t.importDeclaration(
     [t.importSpecifier(
       t.identifier('local') ,
       t.identifier('imported')
     )],
     t.stringLiteral('react222')
  )

 

  traverse(ast,{
    enter(path) {
       if(t.isImportDeclaration(path.node) &&
          path.node.source.value==='react') {

          // path.insertBefore(t.expressionStatement(t.stringLiteral('Because I'm easy come, easy go.')));
         path.insertAfter(t.expressionStatement(t.stringLiteral('should have been here.')))
         const customImport = buildImport('local','imported','react123')
         console.log(customImport)
         path.insertAfter(customImport)
       }
       // if (t.isIdentifier(path.node, { name: 'React' })) {
       //    path.node.name = 'reactccc'
       // }

    }
  })


  const result = generate(ast, null,code)
  console.log('transformed:***\n',result.code)
})

// const code = `function square(n) {
//   return n * n;
// }`;

// const ast = babylon.parse(code);

// traverse(ast, {
//   enter(path) {
//     if (
//       path.node.type === "Identifier" &&
//       path.node.name === "n"
//     ) {
//       path.node.name = "x";
//     }
//   }
// });
// console.log('transformed:***\n',generate(ast,null,code).code)
