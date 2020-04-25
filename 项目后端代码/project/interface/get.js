const express = require('express')
const Router = express.Router()
const sequelize = require('../db.js')
const ParkInfo = sequelize.model('parkInfo')
const carInfo = sequelize.model('carInfo')
const entryInfo = sequelize.model('entryInfo')
const outInfo = sequelize.model('outInfo')
ParkInfo.belongsTo(carInfo, { as: 'info', foreignKey: 'parkID', targetKey: 'parkID' });
carInfo.belongsTo(entryInfo, { as: 'info', foreignKey: 'License_num', targetKey: 'sign' });

// 获取和查询数据
Router.get('/getParkInfo', function (req, res) {
    let parkID = req.query.parkID;
    ParkInfo.findAll({
    }).then((result) => {
        res.status(200).send({ //自定义状态码并发送json数据
            code: 0,
            data: result
        });
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})
// 点击显示车位信息
Router.get('/getSingleParkInfo', function (req, res) {
    let parkID = req.query.parkID;
    ParkInfo.findAll({
        where: {
            parkID: parkID
        }
    }).then((result) => {
        res.status(200).send({ //自定义状态码并发送json数据
            code: 0,
            data: result
        });
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})
// 点击显示车辆信息
Router.get('/getSingleCarInfo', function (req, res) {
    let parkID = req.query.parkID;
    carInfo.findAll({
        where: {
            parkID: parkID
        },
        attributes: ['owner_name', 'License_num', 'parkID', 'owner_phone', sequelize.col('info.timestamps')],
        include: {
            model: entryInfo,
            as: 'info',
            attributes: [],
        },
        raw:true // 这个属性表示开启原生查询，原生查询支持的功能更多，自定义更强
    }).then((result) => {
        res.status(200).send({ //自定义状态码并发送json数据
            code: 0,
            data: result
        });
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})
// 获取进车数据表
Router.get('/getEntryInfo', function (req, res) {
    entryInfo.findAll({
        order: sequelize.literal('id ASC')   //ASC 升序， DESC 降序
    })
        .then((result) => {
            res.status(200).send({ //自定义状态码并发送json数据
                code: 0,
                data: result
            });
        }).catch((err) => {
            res.json({
                code: 500,
                data: `服务器错误${err}`
            })
        })
})
// 获取出车记录
Router.get('/getOutInfo', function (req, res) {
    outInfo.findAll({
        order: sequelize.literal('id ASC')
    })
        .then((result) => {
            res.status(200).send({ //自定义状态码并发送json数据
                code: 0,
                data: result
            });
        }).catch((err) => {
            res.json({
                code: 500,
                data: `服务器错误${err}`
            })
        })
})
// 多表查询(关联查询)
Router.get('/getCarAndPark', function (req, res) {
    ParkInfo.findOne({
        where: {
            parkID: req.query.parkID
        },
        attributes: ['parkID', 'customer_name','park_status',sequelize.col('info.License_num'),sequelize.col('info.owner_phone'),],
        include: {
            model: carInfo,
            as: 'info',
            attributes: [],
        },
        raw:true // 这个属性表示开启原生查询，原生查询支持的功能更多，自定义更强
    })
    .then((result) => {
        res.status(200).send({ //自定义状态码并发送json数据
            code: 0,
            data: result
        });
    }).catch((err) => {
        res.json({
            code: 500,
            data: `服务器错误${err}`
        })
    })
})


module.exports = Router
