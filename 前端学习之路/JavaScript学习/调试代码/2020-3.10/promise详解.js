// setTimeout(function(){
//     console.log(1);
// },0);
// new Promise(function(a,b){
//     console.log(2);
//     for(var i=0;i<10;i++){
//         i==9&&a();
//     }
//     console.log(3)
// }).then(function(){
//         console.log(4);
// }).then(function(){
//     console.log('ou')
// });
// console.log(5);

// https://blog.csdn.net/lqyygyss/article/details/102662606     深度揭秘 Promise 微任务和执行过程

// new Promise((resolve, reject) => {
//     console.log("外部promise");
//     resolve();
// }).then(() => {
//     console.log("外部第一个then");
//     return new Promise((resolve, reject) => {
//         console.log("内部promise");
//         resolve();
//     }).then(() => {
//         console.log("内部第一个then");
//     })
//     .then(() => {
//         console.log("内部第二个then");
//     });
// }).then(() => {
//     console.log("外部第二个then");
// });


// 外部promise
// 外部第一个then
// 内部promise
// 内部第一个then
// 内部第二个then
// 外部第二个then


// new Promise((resolve, reject) => {
//     console.log("外部promise");
//     resolve();
//     console.log('jinmengyao')
// })
//     .then(() => {
//         console.log("外部第一个then");
//         new Promise((resolve, reject) => {
//             console.log("内部promise");
//             resolve();
//         })
//             .then(() => {
//                 console.log("内部第一个then");
//             })
//             .then(() => {
//                 console.log("内部第二个then");
//             });
//     })
//     .then(() => {
//         console.log("外部第二个then");
//     });
// console.log('xinghua')

// 外部promise
// jinmengyao
// 外部第一个then
// 内部promise
// 内部第一个then
// 外部第二个then
// 内部第二个then

// new Promise((resolve, reject) => {
//     console.log("外部promise");
//     resolve();
// })
//     .then(() => {
//         console.log("外部第一个then");
//         let p = new Promise((resolve, reject) => {
//             console.log("内部promise");
//             resolve();
//         })
//         p.then(() => {
//             console.log("内部第一个then");
//         })
//         p.then(() => {
//             console.log("内部第二个then");
//         });
//     })
//     .then(() => {
//         console.log("外部第二个then");
//     });

// 外部promise
// 外部第一个then
// 内部promise
// 内部第一个then
// 内部第二个then
// 外部第二个then

// new Promise((resolve, reject) => {
//     console.log("外部promise");
//     resolve();
// })
//     .then(() => {
//         console.log("外部第一个then");
//         new Promise((resolve, reject) => {
//             console.log("内部promise");
//             resolve();
//         })
//             .then(() => {
//                 console.log("内部第一个then");
//             })
//             .then(() => {
//                 console.log("内部第二个then");
//             });
//         return new Promise((resolve, reject) => {
//             console.log("内部promise2");
//             resolve();
//         })
//             .then(() => {
//                 console.log("内部第一个then2");
//             })
//             .then(() => {
//                 console.log("内部第二个then2");
//             });
//     })
//     .then(() => {
//         console.log("外部第二个then");
//     });

// 外部promise
// 外部第一个then
// 内部promise
// 内部promise2
// 内部第一个then
// 内部第一个then2
// 内部第二个then
// 内部第二个then2
// 外部第二个then

new Promise((resolve, reject) => {
    console.log('外部promise');
    resolve();
})
    .then(() => {
        console.log('外部第一个then');
        new Promise((resolve, reject) => {
            console.log('内部promise');
            resolve();
        })
            .then(() => {
                console.log('内部第一个then');
                return Promise.resolve();
            })
            .then(() => {
                console.log('内部第二个then');
            })
    })
    .then(() => {
        console.log('外部第二个then');
    })
    .then(() => {
        console.log('外部第三个then');
    })
    .then(() => {
        console.log('外部第四个then')
    })
    .then(() => {
        console.log('外部第五个then')
    })
    .then(() => {
        console.log('外部第六个then')
    })

// 外部promise
// 外部第一个then
// 内部promise
// 内部第一个then
// 外部第二个then
// 外部第三个then
// 内部第二个then


