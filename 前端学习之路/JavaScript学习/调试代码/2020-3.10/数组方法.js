var Obj = [
    {
        FormId: '01',
        status: true
    },
    {
        FormId: '02',
        status: true
    },
    {
        FormId: '03',
        status: true
    }
]

var b = Obj.every((item) => {
    return item.status === true
})

console.log(b)

// 公司表单逻辑
var FormId = ''
var formList = [
    {
        isSucc: true
    },
    {
        isSucc: false
    },
    {
        isSucc: true
    },
    {
        isSucc: true
    },
    {
        isSucc: true
    },
]
function next(){
    console.log('1')
    let count = 0;
    for (let i = 0; i < formList.length; i++) {
        if (!formList[i].isSucc) { //未保存的才能进入
            if(FormId){ //FormId为空，第一次不会进来，但是第二次以后会进来
                
            }else{
                FormId = i; // 只有第一个未保存的会进来，第一次之后FormId都是有值的。
            }
            count++;// 只要有未保存的，count都会++
        }
    }
    console.log(count)
    if (count === 0) {
        console.log('都保存了，直接跳转')
    } else if (count > 1){
        console.log('您还有表单未保存，请保存后再提交!')
    }else if (count === 1 && FormId){
        console.log('保存', FormId)
    }
}
next()


// js 数组和类数组的区别   https://www.cnblogs.com/jiayeyuan/p/10886568.html