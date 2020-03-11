const hmtlStr = '<p><em>lorem</em><strong>ipsum</strong></p>';
// lorem ipsum strip tags
// 正则表达式  replace splice  规则
const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');
// <[^>]*>
// [0-9]+
console.log(stripHTMLTags(hmtlStr));