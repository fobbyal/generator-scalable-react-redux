if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod').default
} else {
  module.exports = require('./configureStore.dev').default
}
// may use following line instead for debut
//module.exports = require('./configureStore.dev').default
