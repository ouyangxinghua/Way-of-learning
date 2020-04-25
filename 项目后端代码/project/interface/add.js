const express = require('express')
const Router = express.Router()
const sequelize = require('../db.js')
const ParkInfo = sequelize.model('parkInfo')
const carInfo = sequelize.model('carInfo')
const entryInfo = sequelize.model('entryInfo')
const outInfo = sequelize.model('outInfo')

// 增加车位数据
Router.post('/AddParkInfo', function (req, res) {
    console.log('req', req.body)
    let {parkID, name, status, deadline} = req.body;
    console.log(name)
    ParkInfo.create({
        parkID: parkID,
        customer_name: name,
        park_status: status,
        park_deadline: deadline
    }).then((result) => {
        res.json({
            code: 0,
            data: `修改成功${parkID}`
        })
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})
// 增加车辆信息
Router.post('/AddCarInfo', function (req, res) {
    console.log('req', req.body)
    let {parkID, name, license, phone} = req.body;
    console.log(name)
    carInfo.create({
        parkID: parkID,
        owner_name: name,
        License_num: license,
        owner_phone: phone
    }).then((result) => {
        res.json({
            code: 0,
            data: `添加成功${name}`
        })
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})
// 车辆进入登记
Router.post('/AddEntryInfo', function (req, res) {
    console.log('req', req.body)
    let {name, sign, time, date} = req.body;
    console.log(name)
    entryInfo.create({
        name: name,
        sign: sign,
        entryTime: time,
        timestamps: date
    }).then((result) => {
        res.json({
            code: 0,
            data: `添加成功${name}`
        })
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})
// 车辆离开登记
Router.post('/AddOutInfo', function (req, res) {
    console.log('req', req.body)
    let {name, sign, time} = req.body;
    console.log(name)
    outInfo.create({
        name: name,
        sign: sign,
        outTime: time
    }).then((result) => {
        res.json({
            code: 0,
            data: `添加成功${name}`
        })
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})

module.exports = Router