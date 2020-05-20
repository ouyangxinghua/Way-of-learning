class Vue{
    constructor(el){
        this.el = el;
    }
    static use(){
        console.log('你使用了Vue的use方法!')
    }
}
let React = () => {
    console.log('React框架真牛皮!')
}
// let app = new Vue('#app')
// var arr = [...[1,2,3]]
console.log(React)
// import say from './say.js';
// export { say, Vue, React }
function async(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // console.log(this)
            resolve('yes')
        })
    })
}
async().then((data) => {
    console.log(data)
})