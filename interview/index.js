var obj = {
    a: 1,
    b: 2
}
function aa() {
    console.log(this.a)
    function bb(){
        console.log(this.a)
    }
    (() => {
        console.log(this.a)
    })()
    bb()
}

aa.call(obj)