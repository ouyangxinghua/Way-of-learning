// https://www.cnblogs.com/chaixiaozhi/p/8515087.html
// https://www.jb51.net/article/81766.htm

function Parent(name, height) {
    this.name = name;
    this.height = height;
}

function Child(age) {
    this.age = age;
}

Child.prototype = new Parent('hahaha', 171);

let ch = new Child(21)
let ou = new Child(23)
Child.prototype.name = 'xinghua'


console.log(ch.name, ou.name)