const jscodeshift = require('jscodeshift')
const t = jscodeshift
const b = jscodeshift
const { read,treeModder,toSource,write } = require('../util')
const { fromNullable, Just, Nothing } = require('data.maybe')
const R =  require('ramda')

const addNav = navName => treeModder( ast => 
   ast.findVariableDeclarators('navs')
  .find(t.ArrayExpression)
  .get('elements')
  .push(b.identifier(navName))
)

const addContainer = containerName => treeModder( ast => 
   ast.findVariableDeclarators('Containers')
  .find(t.ArrayExpression)
  .get('elements')
  .push(b.identifier(containerName))
)

const createImport = name =>
  b.importDeclaration(
    [ 
      b.importSpecifier(
        b.identifier('Container'),
        b.identifier(containerName(name))
      ),
      b.importSpecifier(
        b.identifier('navs'),
        b.identifier(navName(name))
      ),
    ] ,
    b.literal(name)
  )



const addImport = importBlock => treeModder( ast => 
   ast.find(t.Program)
  .get('body')
  .unshift(importBlock)
)

const containerName = mName => `${mName}Container` 
const navName = mName => `${mName}Navs` 

const addModuleImports =  R.compose(addImport,createImport)
const addModuleNav = R.compose(addNav,navName)
const addModuleContainer = R.compose(addContainer,containerName)

const addModuleAlias= mName => babelRc => {
  fromNullable(babelRc)
    .chain(b => fromNullable(b.plugins))
    .chain(p => fromNullable(p.filter(e => e[0]==='module-resolver')[0]))
    .map(mr => mr[1])
    .map(mr => mr.alias[mName] = `./src/${mName}`)
    .getOrElse('')
  return babelRc
}
  

const injectModule = (name,dashboardPath,babelRcPath,log) => {
  read(dashboardPath)
  .map(jscodeshift)
  .map(addModuleNav(name))
  .map(addModuleContainer(name))
  .map(addModuleImports(name))
  .map(toSource)
  .chain(write(dashboardPath))
  .fork(
    err => log(`failed processing ${dashboardPath} for ${name}\n`,err),
    _ => log(`module ${name} was succesfully injected into ${dashboardPath}`)
  )

  read(babelRcPath)
  .map(JSON.parse)
  .map(addModuleAlias(name))
  .map(val => JSON.stringify(val,null,4))
  .chain(write(babelRcPath))
  .fork(
    err => log(`failed processing ${babelRcPath} for ${name}\n`,err),
    _ => log(`module ${name} was succesfully injected into ${babelRcPath} for alias`)
  )
}



exports.injectModule = injectModule
//exports.injectModuleAlias = injectModuleAlias 
