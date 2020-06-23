// var a,b = null;
// console.log(a, typeof a)
// console.log(b, typeof b)
// console.log(c, typeof c)

var a = {a: '1'}
var b = {b: '2'}

function ouyang(arg1, arg2){
    arg1 = arg2;
    arg1['c'] = 'ouyang'
}
ouyang(a,b)
console.log(a,b)