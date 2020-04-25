const express = require('express')
const Router = express.Router()
const sequelize = require('../db.js')
const ParkInfo = sequelize.model('parkInfo')
const carInfo = sequelize.model('carInfo')

// 删除车位数据
Router.get('/SCParkInfo', function (req, res) {
    let parkID = req.query.parkID;
    ParkInfo.destroy({
        where: {
            parkID: parkID
        }
    }).then((result) => {
        res.json({
            code: 0,
            data: `删除成功${parkID}`
        })
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})
// 离开车位删除信息
Router.get('/SCCarInfo', function (req, res) {
    let parkID = req.query.parkID;
    carInfo.destroy({
        where: {
            parkID: parkID
        }
    }).then((result) => {
        res.json({
            code: 0,
            data: `删除成功${parkID}`
        })
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})


module.exports = Router