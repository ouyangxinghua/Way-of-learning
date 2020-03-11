const _ =require('lodash')
const arr1 = [99,0,33,[101,202,[303,404,[308]]],1,2];
const arr2 = [2,1,2];
const users = [
    {user: 'fred', age: 48},
    {user: 'barney',age: 36},
    {user: 'fred',age: 40},
    {user: 'barney',age: 34}
]
const flattenArr1 = _.flattenDeep(arr1);//数组扁平化
const sortedUser = _.sortBy(users,['age','user'])
// const sortedAge = _.sortBy(users,['age'])
const uniq = _.uniq(arr2);
// console.log(sortedAge);
console.log(sortedUser);
console.log(uniq);
console.log(flattenArr1)
