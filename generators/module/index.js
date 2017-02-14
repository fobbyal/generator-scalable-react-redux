const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const username = require('username')
const R = require('ramda')
const { Left,Right } = require('data.either')
const fs = require('fs')
const path = require('path')
const { fromNullable, Just, Nothing } = require('data.maybe')




const checkEmpty = val => R.isEmpty(val) ?
  Left('Please enter a non empty module name.') :
  Right(val)

const checkExists = destDir => module => {
  const containsModule = R.contains(module)
  //R.contains(module,
  const files = fs.readdirSync(path.join(destDir,'src')).
    map(s => s.toLowerCase())
  return containsModule(files) ?
    Left(`Module: ${module} already exist!!! Please enter a new module name`):
    Right(module)
}


//todo: validate for tempalte for valid pathname match with regex

const validateModule = destDir => val =>
  checkEmpty(val)
    .chain(checkExists(destDir))
    .map( _ => true)
    .merge()

module.exports = Generator.extend({

  initializing() {
    const config = this.config.getAll()
    const { createdBy } = config
    if(createdBy !== this.rootGeneratorName())
      this.env.error('module sub genreator only works with react-redux-spa generator.\n'+
                     'Please stand-up basic scalfolding first')
      this.log(this.destinationPath())
  },
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Please enter app name?',
        validate: validateModule(this.destinationPath())
      }
    ]

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props
      this.log(props)
    })

  },

  writing() {
    const root =`src/${ this.props.name }`

    this.fs.copy(
      this.templatePath('**/*.*'),
      this.destinationPath(root)
    )
    this.fs.copyTpl(
      this.templatePath('container/Container.js'),
      this.destinationPath(`${root}/container/Container.js`),
      { name:this.props.name }
    )
    this.fs.copyTpl(
      this.templatePath('container/Default.js'),
      this.destinationPath(`${root}/container/Default.js`),
      { name:this.props.name }
    )

    this.fs.copyTpl(
      this.templatePath('constants.js'),
      this.destinationPath(`${root}/constants.js`),
      { name:this.props.name }
    )
  },

  end () {
    const modules = fromNullable(this.config.getAll().modules)
      .map(m => m).getOrElse([])
    this.config.set('modules', [...modules,this.props.name])
    this.config.save()

    const root =`src/${ this.props.name }`

    this.log(yosay(`The module ${chalk.green(this.props.name)} is succesuflly created at 
                   ${chalk.green(this.destinationPath(root))} `)) 
  }

})
