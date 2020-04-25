const express = require('express')
const Router = express.Router()
const sequelize = require('../db.js')
const ParkInfo = sequelize.model('parkInfo')

// 修改数据
Router.post('/XGParkInfo', function (req, res) {
    let parkID = req.body.parkID;
    let park_deadline = req.body.park_deadline;
    ParkInfo.update({
        park_deadline: park_deadline
    },{
        where: {
            parkID: parkID
        }
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


module.exports = Router