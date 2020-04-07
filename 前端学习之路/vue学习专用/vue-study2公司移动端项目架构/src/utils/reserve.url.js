import { fetchData } from './ajax'

// 获取大厅列表
export function hallInfoList (data, type, callFunc) {
    var msg = data
    if (callFunc && (callFunc.constructor === Function)) {
        return fetchData('/ApprNetInterface/api/hall/hallInfoList/query.v', msg, type, callFunc)
    }
    return fetchData('/ApprNetInterface/api/hall/hallInfoList/query.v', msg, type)
}
// 获取预约单位列表
export function unitList (data, type, callFunc) {
    var msg = data
    if (callFunc && (callFunc.constructor === Function)) {
        return fetchData('/ApprNetInterface/api/hall/unitList/1/query.v', msg, type, callFunc)
    }
    return fetchData('/ApprNetInterface/api/hall/unitList/1/query.v', msg, type)
}
// 获取预约业务列表
export function reserveTypeList (data, type, callFunc) {
    var msg = data
    if (callFunc && (callFunc.constructor === Function)) {
        return fetchData('/ApprReserveInterface/api/reserve/reserveTypeList/query.v', msg, type, callFunc)
    }
    return fetchData('/ApprReserveInterface/api/reserve/reserveTypeList/query.v', msg, type)
}
// 获取预约日期
export function reserveDateList (data, type, callFunc) {
    var msg = data
    if (callFunc && (callFunc.constructor === Function)) {
        return fetchData('/ApprReserveInterface/api/reserve/reserveDateList/query.v', msg, type, callFunc)
    }
    return fetchData('/ApprReserveInterface/api/reserve/reserveDateList/query.v', msg, type)
}
// 提交预约
export function addReserveInfo (data, type, callFunc) {
    var msg = data
    if (callFunc && (callFunc.constructor === Function)) {
        return fetchData('/ApprReserveInterface/api/reserve/reserveInfo/add.v', msg, type, callFunc)
    }
    return fetchData('/ApprReserveInterface/api/reserve/reserveInfo/add.v', msg, type)
}
// 获取网厅用户信息
export function getOutUserInfo (data, type, callFunc) {
    var msg = data
    if (callFunc && (callFunc.constructor === Function)) {
        return fetchData('/ApprNetUserInterface/api/user/outUserInfo/query.v', msg, type, callFunc)
    }
    return fetchData('/ApprNetUserInterface/api/user/outUserInfo/query.v', msg, type)
}
// 登录页面获取统一认证登录参数
export function interOutnetConfig(data, type, callFunc) {
    var msg = data
    if (callFunc && (callFunc.constructor === Function)) {
        return fetchData('/ApprNetInterface/api/sys/outnetConfig/query.v', msg, type, callFunc)
    }
    return fetchData('/ApprNetInterface/api/sys/outnetConfig/query.v', msg, type)
}
// 根据事项主键获取业务信息接口
export function getApproveItem(data, type, callFunc) {
    var msg = data
    if (callFunc && (callFunc.constructor === Function)) {
        return fetchData('/ApprReserveInterface/api/hardware/loadBus.v', msg, type, callFunc)
    }
    return fetchData('/ApprReserveInterface/api/hardware/loadBus.v', msg, type)
}

// 优化公司代码
// export function get(data, type, callFunc){
//     var fn = (callFunc && (callFunc.constructor === Function)) ? callFunc : ''
//     return fetchData('/ApprReserveInterface/api/hardware/loadBus.v', data, type, fn)
// }