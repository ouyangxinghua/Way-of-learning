//加载场景代码
// THING.Utils.dynamicLoad(['/uploads/wechat/101158/file/停车场管理系统/api.js'], function(){
//     console.log('加载文件成功')
// })
var app = new THING.App({
    // 场景地址
    "url": "/api/scene/61b86c45cfb09377cbf01f18",
    //背景设置
    "skyBox": "BlueSky"
});
// 引入图片文件
var baseURL = "https://www.thingjs.com/static/images/sliohouse/";
app.background = '/uploads/wechat/oLX7p0zOGLar_E2BzYn5fn8ZeaDs/file/bg.jpg';
// 一进来要初始化和执行的操作
app.on('load', function (evt) {
    displayCar()
    //初始化摄像机
    init_camera();
    var webView01 = app.create({
        type: 'WebView',
        url: 'https://cn.bing.com/',
        position: [40, 10, -39],
        width: 3500 * 0.01, // 3D 中实际宽度 单位 米
        height: 1880 * 0.01, // 3D 中实际高度 单位 米
        domWidth: 3500, // 页面宽度 单位 px
        domHeight: 1880// 页面高度 单位 px
    });
    var campus = evt.campus;
    var objs = app.query('.Building').add(campus.things);
    // 划过勾边
    objs.on('mouseon', function (ev) {
        if (ev.object.name.search("car") == 0) {
            this.style.outlineColor = '#ff0000';
        }
        if (ev.object.name.search("park") == 0) {
            this.style.outlineColor = '#0000ff';
        }
    });
    objs.on('mouseoff', function () {
        this.style.outlineColor = null;
    });
    // 单击事件
    app.on('click', function (ev) {
        if (ev.object.name.search("car") == 0) {
            destroy_ui(panel);
            getCarData(ev.object);
        }
        if (ev.object.name.search("park") == 0) {
            destroy_ui(panel);
            getParkData(ev.object);
        }
    });
})
var carObj = [];
function displayCar() {
    $.ajax({
        url: 'http://localhost:3000/get/getParkInfo',
        type: 'get',
        success: function (res) {
            for (let i = 0; i < res.data.length; i++) {
                carObj[i] = app.create({
                    id: res.data[i].parkID,
                    type: "car",
                    name: 'car',
                    url: "/api/models/70b46170c61e43b4ad1e212cb0941240/0/gltf/",
                    parent: app.query(res.data[i].parkID)[0],
                    angles: [0, 90, 0],
                    localPosition: [0, 0, 0],
                    size: 4
                }).on('mouseon', function (ev) {
                    if (ev.object.name.search("car") === 0) {
                        this.style.outlineColor = '#ff0000';
                    }
                }).on('mouseoff', function () {
                    this.style.outlineColor = null;
                });;
            }
        }
    })
}
//初始化摄像机
function init_camera() {
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [40, 50, 60],
        'target': [40, 0, 0],
        'time': 1800
    });
}
//创建面板
var panel;
var dataObj;
var carInfo;
var parkInfo;
function destroy_ui(panel) {
    if (panel) {
        panel.destroy();
        panel = null;
    }
}
// 车位信息
function create_ui_park() {
    panel = new THING.widget.Panel({
        titleText: "车位信息",
        closeIcon: true, // 是否有关闭按钮
        dragable: true,
        retractable: true,
        opacity: 0.9,
        hasTitle: true,
        titleImage: 'https://www.thingjs.com/static/images/example/icon.png'
    });
    panel.position = [0, 329];
    dataObj = {
        park: parkInfo.parkID,
        name: parkInfo.customer_name,
        state: parkInfo.park_status === 1 ? '已交' : '未售出',
        date: parkInfo.park_deadline,
        open: parkInfo.park_status === 1 ? true : false,
    };
    var park = panel.addString(dataObj, 'park').caption('车位编号');
    var name = panel.addString(dataObj, 'name').caption('车主姓名');
    var state = panel.addString(dataObj, 'state').caption('车位状态');
    var date = panel.addString(dataObj, 'date').caption('车位期限');
    var open1 = panel.addBoolean(dataObj, 'open').caption('操作车位');
    open1.on('change', function (ev) {
        if (ev) {
            destroy_ui(button)
            create_iframe('entry', dataObj.park)
        } else {
            destroy_ui(button)
            create_iframe('out', dataObj.park)
        }
    })

}
// 进车和出车iframe
var button = null;
function create_iframe(str, arg) {
    // console.log('车位编号', arg)
    button = new THING.widget.Panel({
        titleText: str === 'entry' ? "使用车位" : "离开车位",
        closeIcon: true, // 是否有关闭按钮
        dragable: true,
        retractable: true,
        opacity: 0.9,
        hasTitle: true,
        titleImage: 'https://www.thingjs.com/static/images/example/icon.png'
    });
    button.position = [85, 0];
    dataObj = {
        iframe: `http://127.0.0.1:5500/%E9%A1%B9%E7%9B%AE%E5%90%8E%E7%AB%AF%E4%BB%A3%E7%A0%81/project/interface/iframe.html?name=true&parkID=${arg}`,
        iframe1: `http://127.0.0.1:5500/%E9%A1%B9%E7%9B%AE%E5%90%8E%E7%AB%AF%E4%BB%A3%E7%A0%81/project/interface/iframe.html?name=false&parkID=${arg}`
    };
    var iframe;
    if (str === 'entry') {
        iframe = button.addIframe(dataObj, 'iframe').caption('填写信息');
    } else {
        iframe = button.addIframe(dataObj, 'iframe1').caption('删除信息');
    }
    iframe.setHeight('400px');
};
// 监听ifram传值
window.addEventListener("message", function (e) {
    console.log('-----', e.data.msg)
    if (e.data.msg) {
        button.destroy();
        button = null;
        destroy_ui(panel);
    }
}, false);
// 获取车位信息
function getParkData(obj) {
    console.log(obj.name)
    $.ajax({
        url: 'http://localhost:3000/get/getSingleParkInfo',
        data: { 'parkID': obj.name },
        type: 'get',
        success: function (res) {
            // console.log('ouyang', res.data[0])
            if (res.data[0]) {
                parkInfo = res.data[0];
            } else {
                parkInfo = {
                    parkID: obj.name,
                    customer_name: '暂无',
                    park_status: '未售出',
                    park_deadline: '暂无'
                }
            }
            create_ui_park();
        }
    })
}
// 车辆信息
function create_ui_car() {
    panel = new THING.widget.Panel({
        titleText: "车辆信息",
        closeIcon: true, // 是否有关闭按钮
        dragable: true,
        retractable: true,
        opacity: 0.9,
        hasTitle: true,
        titleImage: 'https://www.thingjs.com/static/images/example/icon.png'
    });
    panel.position = [0, 326];
    // 创建任意对象
    dataObj = {
        name: carInfo.owner_name,
        park: carInfo.parkID,
        plateNum: carInfo.License_num,
        contactNum: carInfo.owner_phone
    };
    // 动态绑定物体
    var name = panel.addString(dataObj, 'name').caption('车主姓名');
    var park = panel.addString(dataObj, 'park').caption('车位编号');
    var plateNum = panel.addString(dataObj, 'plateNum').caption('车牌号码');
    var contactNum = panel.addString(dataObj, 'contactNum').caption('联系电话');

}
// 获取车主信息
function getCarData(obj) {
    // console.log(obj.id)
    $.ajax({
        url: 'http://localhost:3000/get/getSingleCarInfo',
        data: { 'parkID': obj.id },
        type: 'get',
        success: function (res) {
            console.log('获取车主电话', res.data[0].owner_phone)
            if (res.data[0]) {
                carInfo = res.data[0];
            } else {
                carInfo = {
                    owner_name: '暂无',
                    parkID: '暂无',
                    License_num: '暂无',
                    owner_phone: '暂无'
                }
            }
            create_ui_car();
        }
    })
}

// 第三步，创建主面板添加空间统计，闸门管理，播放动画，出入登记等功能按钮，同时创建闸门管理子面板。
//主面板
var toolbar = new THING.widget.Panel({ width: '83px' });
// 数据对象
var dataObj = {
    warehouseCode: true,
    temperature: false,
    humidity: false,
    statistics: false,
    status: false,
    insect: false,
    cerealsReserve: false,
    video: false,
    cloud: true,
    orientation: false
}
//面板按钮组件及事件
var button0 = toolbar.addImageBoolean(dataObj, 'statistics').caption('空间统计').imgUrl(baseURL + 'statistics.png');
var button2 = toolbar.addImageBoolean(dataObj, 'video').caption('播放动画').imgUrl(baseURL + 'video.png');
var button3 = toolbar.addImageBoolean(dataObj, 'status').caption('进车记录').imgUrl(baseURL + 'cereals_reserves.png');
var button4 = toolbar.addImageBoolean(dataObj, 'temperature').caption('出车记录').imgUrl(baseURL + 'temperature.png');
var button5 = toolbar.addImageBoolean(dataObj, 'orientation').caption('更新车位').imgUrl(baseURL + 'orientation.png');

button3.on('change', function (ev) {
    if (ev) {
        getEntry();
    } else {
        panel01.destroy();
        panel01 = null;
    }
})
button4.on('change', function (ev) {
    if (ev) {
        getOut();
    } else {
        panel02.destroy();
        panel02 = null;
    }
})
button5.on('change', function (ev) {
    if (ev) {
        for (let i = 0; i < carObj.length; i++) {
            destroy_ui(carObj[i])
            if (i === carObj.length - 1) {
                displayCar()
            }
        }
    }
})
//播放动画
function animation(ev) {
    var car = app.query('car_3')[0];
    if (ev) {
        var path = [[24, 0, 20], [24.4, 0, 0.5]];
        console.log('animatiion', car)
        var entry = app.query('railing1')[0];
        app.camera.flyTo({
            'position': [24, 10, 30],
            'target': [24, 0, 0],
            'time': 1800
        });
        setTimeout(function () {
            car.visible = true;
            entry.rotateZ(60.0);
            car.movePath({
                'path': path, // 轨迹路线
                'time': 2000, // 移动时间
                'orientToPath': true, // 物体移动时沿向路径方向
            });
        }, 2000)
        setTimeout(function () {
            entry.rotateZ(-60.0);
        }, 5000)
    }else {
        car.visible = false;
    }
}
button2.on('change', function (ev) {
    animation(ev)
});
//空间统计
var opacityFlag = true;
button0.on('change', function () {
    if (opacityFlag) {
        opacityFlag = false;
        $.ajax({
            url: 'http://localhost:3000/get/getParkInfo',
            type: 'get',
            success: function (res) {
                for (let i = 0; i < res.data.length; i++) {
                    let item = res.data[i]
                    var all = app.query(/park/).length;
                    // console.log(item.parkID)
                    app.query(/park/).forEach(
                        function (obj) {
                            var str = obj.name;
                            if (str === item.parkID && item.park_status === 1) {
                                obj.style.color = "#FF0000";
                            }
                        }
                    );
                }
                var num2 = app.query(/park/).length - res.data.length;
                createPanel(res.data.length, num2);
                THING.Utils.dynamicLoad(['/guide/lib/echarts.min.js'], function () {
                    showParkingInfo();// 车位信息
                    // 创建图表
                    function createChart(option, type) {
                        var bottomBackground = document.createElement('div');// 创建背景 div
                        var bottomDom = document.createElement('div');// 图表 div

                        // 设置背景div和图表div的样式
                        if (type == "车位状态") {
                            var backgroundStyle = 'position: absolute;top:3px;left:290px;height:300px;width:380px;background: rgba(22,24,63,0.8); border-radius:3px';
                            var chartsStyle = 'position: absolute;top:10px;right:0px;width:360px;height:250px;margin:0 10px;';
                        }
                        bottomBackground.setAttribute('style', backgroundStyle);
                        bottomDom.setAttribute('style', chartsStyle);
                        bottomBackground.id = 'bgc';
                        // echarts 初始化
                        var bottomCharts = window.echarts.init(bottomDom);
                        bottomCharts.setOption(option);

                        // 图表交互 当点击图图表时触发，params是点击位置信息参数
                        bottomCharts.on('click', function (params) {
                            // 根据鼠标点击时的参数，控制场景中物体变化
                            if (params.name == "空置车位") {
                                app.query("空置车位").style.outlineColor = "#4a8cff"
                            }
                            else if (params.name == "占用车位") {
                                app.query("占用车位").style.outlineColor = "#ff6c00"
                            }
                        });

                        bottomBackground.appendChild(bottomDom);
                        app.domElement.appendChild(bottomBackground);// 添加到app dom下
                    }
                    // 当前停车位状态
                    function showParkingInfo() {
                        var parkingTotalNum = all;
                        var emptyNum = num2;
                        var parkOption = {
                            title: { text: '当前车位状态', x: 'center', textStyle: { color: '#cccccc' } },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                top: 60,
                                x: 'left',
                                data: ['占用车位', '空置车位'],
                                textStyle: {
                                    color: '#cccccc'
                                }
                            },
                            calculable: true,
                            series: [
                                {
                                    name: '车位', type: 'pie', radius: '55%', center: ['50%', '60%'],
                                    data: [
                                        { value: parkingTotalNum - emptyNum, name: '占用车位', itemStyle: { color: "#ff6c00" } },
                                        { value: emptyNum, name: '空置车位', itemStyle: { color: "#4a8cff" } }
                                    ]
                                }
                            ]
                        };
                        createChart(parkOption, "车位状态");
                    }
                })
            }
        })
    } else {
        destroy_ui(tongji);
        let bgc = document.getElementById('bgc');
        bgc.parentNode.removeChild(bgc);
        opacityFlag = true;
        app.query(/park/).forEach(
            function (obj) {
                obj.style.opacity = 1;
                obj.style.color = null;
            }
        )
    }
});
// 创建面板，配置项介绍   
var tongji = null;
var createPanel = function (num1, num2) {
    // 创建面板配置项
    tongji = new THING.widget.Panel({
        // 角标样式
        cornerType: 'none',
        // 设置面板宽度
        width: '200',
        // 是否允许有面板title
        hasTitle: true,
        // 设置title标题名称
        titleText: '我是标题',
        // title是否允许有关闭按钮
        closeIcon: true,
        // title是否支持拖拽功能
        dragable: true,
        // title是否支持收起功能
        retractable: true,
        // 设置透明度
        opacity: 0.9,
        // 设置层级
        zIndex: 99
    });

    // 创建数据对象
    var dataObj = {
        use: num1,
        overage: num2
    };

    // 添加数据
    var used = tongji.addString(dataObj, 'use').caption('已用车位').isChangeValue(false);
    var overage = tongji.addString(dataObj, 'overage').caption('剩余车位').isChangeValue(false);
    // 获取面板标签
    var dom = tongji.domElement;

    // 修改面板标题
    tongji.titleText = '车位数量统计';

    // 设置/获取面板相关属性
    tongji.visible = true;  // false
    tongji.position = [85, 0];  // 设置panel面板的位置
    tongji.zIndex = 9;
    tongji.opacity = 0.9;
    // 删除面板
    // panel.destroy();
    // panelPos,panelPosStep为内置变量仅用于展示例子效果使面板不重叠
    panelPos[0] += panelPosStep;
    panelPos[1] += panelPosStep;
};

// 获取进车记录
var panel01 = null;
function getEntry() {
    $.ajax({
        url: 'http://localhost:3000/get/getEntryInfo',
        type: 'get',
        success: function (res) {
            // console.log('getEntry', res.data)
            var arr = res.data.reverse().slice(0, 10);
            var newArr = [];
            var obj = {};
            for (i in arr) {
                obj["车主姓名"] = arr[i].name;
                obj["车牌号"] = arr[i].sign;
                obj["进入时间"] = arr[i].entryTime;
                newArr.push(obj)
                obj = {};
            }
            var tableData = {
                // 列标题
                props: ['车主姓名', '车牌号', '进入时间'],
                // 列数据
                items: newArr
            };

            panel01 = THING.widget.Panel({
                titleText: '最近车辆进入登记表',
                width: '450px',
                hasTitle: true,
                closeIcon: true,
                // 面板是否支持拖拽功能
                dragable: true,
                // 面板是否支持收起功能
                retractable: true,
            });
            panel01.position = [280, 0];
            // 向 Panel 中添加表格
            var table = panel01.addTable(tableData);
        }
    })
}
// 获取出车记录
var panel02 = null;
function getOut() {
    $.ajax({
        url: 'http://localhost:3000/get/getOutInfo',
        type: 'get',
        success: function (res) {
            // console.log('getEntry', res.data)
            var arr = res.data.reverse().slice(0, 10);
            var newArr = [];
            var obj = {};
            for (i in arr) {
                obj["车主姓名"] = arr[i].name;
                obj["车牌号"] = arr[i].sign;
                obj["离开时间"] = arr[i].outTime;
                newArr.push(obj)
                obj = {};
            }
            var tableData = {
                // 列标题
                props: ['车主姓名', '车牌号', '离开时间'],
                // 列数据
                items: newArr
            };

            panel02 = THING.widget.Panel({
                titleText: '最近车辆离开登记表',
                width: '450px',
                hasTitle: true,
                closeIcon: true,
                // 面板是否支持拖拽功能
                dragable: true,
                // 面板是否支持收起功能
                retractable: true,
            });
            panel02.position = [280, 0];
            // 向 Panel 中添加表格
            var table = panel02.addTable(tableData);
        }
    })
}

