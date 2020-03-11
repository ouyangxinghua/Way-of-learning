// function genrateHashtag(str){
//     // var newArr = []
//     if(str.length > 140 || str === '')
//         return false;
//     str ='#' + str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
//     return str;
// }
console.log(genrateHashtag('hello miss dong'));

// - 如果字符超过140字， 返回false
// - 如果是空字符，也返回false
// - 以#开始
// - 每个单词首字母大写


// 优化代码
function genrateHashtag(str){
    return str.length > 140 || str === ''? false : '#' + str.split(' ').map(capitalize).join(' ')
}
function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}