const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const username = require('username')

module.exports = Generator.extend({

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the ${ chalk.red('react-redux-spa')  } generator!`
    ))

    const prompts = [
    {
      type: 'input',
      name: 'name',
      message: 'Please enter app name?',
      default: this.appname
    },
    {
      type: 'input',
      name: 'author',
      message: 'Please enter authors',
      default: username.sync(),
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please enter description for the app',
      default: undefined,
    }

    ]

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props
      console.log(props)
    })
  },

  writing() {
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // )
  },

  install() {
    //this.installDependencies()
  }
})
