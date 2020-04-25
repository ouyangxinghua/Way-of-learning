const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'my_project', // 数据库名
    'root',   // 用户名
    '123456',   // 用户密码
    {
        'dialect': 'mysql',  // 数据库使用mysql
        'host': 'localhost', // 数据库服务器ip
        'port': 3306,        // 数据库服务器端口
    }
);
// 车位信息
const parkInfo = sequelize.define(
    // tablename
    'parkInfo',
    {
        'parkID': {
            'type': Sequelize.STRING,
            'allowNull': false,
            'primaryKey': true, //主键
            'unique': true
        },
        'customer_name': {
            'type': Sequelize.STRING,
            'allowNull': false
        },
        'park_status': {
            'type': Sequelize.INTEGER,
            'allowNull': false
        },
        'park_deadline': {
            'type': Sequelize.STRING,
            'allowNull': false
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'parkInfo',
        timestamps: false
    }
)
// 车辆信息
const carInfo = sequelize.define(
    // tablename
    'carInfo',
    {
        'owner_name': {
            'type': Sequelize.STRING,
            'allowNull': false,
        },
        'parkID': {
            'type': Sequelize.STRING,
            'allowNull': false,
            'unique': true
        },
        'License_num': {
            'type': Sequelize.STRING,
            'allowNull': false,
            'primaryKey': true, //主键
            'unique': true,
        },
        'owner_phone': {
            'type': Sequelize.STRING,
            'allowNull': false,
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'carInfo',
        timestamps: false
    }
)
// 进车记录表
const entryInfo = sequelize.define(
    // tablename
    'entryInfo',
    {
        'id': {
            'type': Sequelize.INTEGER,
            'autoIncrement': true,
            'unique': true,
        },
        'name': {
            'type': Sequelize.STRING,
            'allowNull': false,
        },
        'sign': {
            'type': Sequelize.STRING,
            'allowNull': false,
            'primaryKey': true, //主键
            'unique': true,
        },
        'entryTime': {
            'type': Sequelize.STRING,
            'allowNull': false,
        },
        'timestamps': {
            'type': Sequelize.STRING,
            'allowNull': false,
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'entryInfo',
        timestamps: false,
        initialAutoIncrement: 0,
        charset: 'utf8',
    }
)
// 出车记录表
const outInfo = sequelize.define(
    // tablename
    'outInfo',
    {
        'id': {
            'type': Sequelize.INTEGER,
            'autoIncrement': true,
            'unique': true,
        },
        'name': {
            'type': Sequelize.STRING,
            'allowNull': false,
        },
        'sign': {
            'type': Sequelize.STRING,
            'allowNull': false,
            'primaryKey': true, //主键
            'unique': true,
        },
        'outTime': {
            'type': Sequelize.STRING,
            'allowNull': false,
        }
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
        tableName: 'outInfo',
        timestamps: false,
        initialAutoIncrement: 0,
        charset: 'utf8',
    }
)

parkInfo.sync();
carInfo.sync();
entryInfo.sync();
outInfo.sync();

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize