const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const username = require('username')
const  { fromNullable, Just, Nothing } = require('data.maybe')
const fs = require('fs')

module.exports = Generator.extend({

  initializing() {
    const fileList =fs.readdirSync(this.destinationPath())
    if(fileList.length > 0) 
      this.env.error('this generator can only run in a empty directory')
  },
  prompting() {
    // Have Yeoman greet the user.k
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
      this.props.name = this.props.name.replace(/\s+/g,'-')
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
      callback: error => {
        if (error) {
          this.env.error('… make sure yarn is installed properly '+
            `Run ${chalk.yellow('npm install')} instead if you must.`
          )
        } 
      }
    })
  },
  end () {
    this.config.set('createdBy',this.rootGeneratorName())
    this.config.save()
    this.log(yosay(`
      That’s it. Feel free to fire up the server with ${chalk.green('yarn start')}
      Navigate to ${chalk.green('http://localhost:3000')}
      To look at the app`))
  }

})
