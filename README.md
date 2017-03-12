# generator-react-redux-spa [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Opiniated React Redux spa scalfolding

#Poject is still in Alpha

## What is this for?
This is a geneartor used to create scalable react-redux based apps. The dir structure is based on the [Three Rules For Structuring (Redux) Applications]( https://jaysoo.ca/2016/02/28/organizing-redux-application/) written by Jack Hsu. I've been using this for a few projects and have enjoyed the convention and decided to try to adopt this at work. However, the amount of the boilerplate required gave me second thoughs. And then.... the idea of this project was born.

## Who is this for
Anyone who wants setup a scalable react-redux application. 

## What this is not
This was created to lighten workload on developers at my work as we are trying out the directory structure. It is heavily opiniated. It is not meant to support every possible way of creating a react app.  This is by no means a standard for react apps. There are certainly better ways to do this.

## Problems with this generator
1. Front end only. I work in a environment that does not have javascript as a backend.
2. Boat load of dependencies you may or may not need. (I trust that able developers can remove them failry quickly)
3. favors yarn instead of npm
4. I put my own .eslint config in here


## Noted features 
1. React Hot Loader
2. React Storybook
3. Redux dev tools comaptible

## More docs needed

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-redux-spa using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)). Also install [yarn](https://yarnpkg.com/en/docs/install)

```bash
npm install -g yo
npm install -g generator-react-redux-spa@alpha
```

Then generate your new project:

```bash
yo react-redux-spa
```
generate a new module with in the project. This will hook up nav automatically
```bash
yo react-redux-spa:module
```


## Task List
- [ ] no tests what-so-ever
- [ ] looking into adding redux observables

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Alex Liang]()


[npm-image]: https://badge.fury.io/js/generator-react-redux-spa.svg
[npm-url]: https://npmjs.org/package/generator-react-redux-spa
[travis-image]: https://travis-ci.org/fobbyal/generator-react-redux-spa.svg?branch=master
[travis-url]: https://travis-ci.org/fobbyal/generator-react-redux-spa
[daviddm-image]: https://david-dm.org/fobbyal/generator-react-redux-spa.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/fobbyal/generator-react-redux-spa
[coveralls-image]: https://coveralls.io/repos/fobbyal/generator-react-redux-spa/badge.svg
[coveralls-url]: https://coveralls.io/r/fobbyal/generator-react-redux-spa
