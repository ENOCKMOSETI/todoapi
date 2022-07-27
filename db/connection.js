const { Sequelize } = require('sequelize');

require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
    module.exports = new Sequelize('postgresql://nbnnndtfxdmtgw:45192450565bfe3c95ec74f1d11fb66fbc2c3aa33ce60ec067315b4e59e2695f@ec2-107-22-122-106.compute-1.amazonaws.com:5432/d8ncgb924lvai7', 
        {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            encrypt: true,
        }
    );
}
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});
module.exports = sequelize;