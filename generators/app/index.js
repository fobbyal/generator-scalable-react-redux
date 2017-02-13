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
      name: 'desc',
      message: 'Please enter description for the app. This will be used as the Title for the webpage',
      default: this.appname,
    },
    {
      type: 'input',
      name: 'author',
      message: 'Please enter authors',
      default: username.sync(),
    }

    ]

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props
      this.log('recieved options:',props)
    })
  },

  writing() {
    this.log('copying template files')
    this.fs.copy(
      this.templatePath('!(node_modules)'),
      this.destinationPath()
    )
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationPath()
    )
    this.fs.copy(
      this.templatePath('mock-api/**/*.*'),
      this.destinationPath('mock-api')
    )
    this.fs.copy(
      this.templatePath('src/**/*.*'),
      this.destinationPath('src')
    )

    this.fs.copyTpl(
      this.templatePath('src/RootNav.js'),
      this.destinationPath('src/RootNav.js'),
      { name:this.props.name }
    )

    this.fs.copyTpl(
      this.templatePath('var-files/package.json'),
      this.destinationPath('package.json'),
      { name:this.props.name,desc: this.props.desc,author: this.props.author }
    )

    this.fs.copyTpl(
      this.templatePath('var-files/index.html'),
      this.destinationPath('src/index.html'),
      { desc:this.props.desc }
    )
  },

  install() {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true,
      callback: _ => this.log(
        `Everything is ready!
        Please use: ${chalk.green('yarn start')} to start the app
        navigate to ${chalk.green('http://localhost:3000')}`
      )
    })
  }
})
