const arr = [99,0,33,[101,202],1,2];
const max = Math.max(...arr);
const min = Math.min(...arr);
console.log(max);
console.log(min);

console.log(Math.max.apply(null, arr));
console.log(Math.min.apply(null, arr));