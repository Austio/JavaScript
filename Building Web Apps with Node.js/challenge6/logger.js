var util = require('util')
var _ = require('lodash')

module.exports = function (name) {
    var n = util.format('Hello there, %s!', name)
    console.log(n)
    console.log(_.now())
}
