// 对象  gaodeMap
const googleMap = {
    show(){
        console.log('开始渲染GOOGLE地图');
    }
}
const gaodeMap = {
    show(){
        console.log('开始渲染高德地图');
    }
}
const sosoMap = {
    show(){
        console.log('开始渲染soso地图');
    }
}
const baiduMap = {
    // 为互换做准备
    show() {
        console.log('开始渲染百度地图');
    }
}
/**
 * 
 * @param {object} map 
 */
const renderMap = (map) => {
    // map 检测
    // if (map.show && typeof map.show === 'function') {
    //     map.show();
    // }
    if (map.show && map.show instanceof Function) {
        map.show();
    }
    // 分支太多
    // if(type === 'baidu'){
    //     baiduMap.show();
    // }
    // else if(type === 'google'){
    //     googleMap.show();
    // }
    // else if(type === 'gaode'){
    //     gaodeMap.show();
    // }
}

renderMap(baiduMap);
renderMap(googleMap);
renderMap(gaodeMap);
renderMap(sosoMap);
renderMap(Map);
