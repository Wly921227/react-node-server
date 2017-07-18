if (process.env.NODE_ENV === 'production') {
    module.exports = require('./state/app')
} else {
    module.exports = require('./state/app.dev')
}
