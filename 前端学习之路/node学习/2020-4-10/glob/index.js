const glob = require('glob')

var arr = glob.sync('./**/*.js')
var arr2 = glob.sync('./**/*.html')
console.log(arr2)