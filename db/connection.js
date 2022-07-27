const { Sequelize } = require('sequelize');

require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
    module.exports = new Sequelize(process.env.DATABASE_URL, 
        {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: true,
            },
        }
    );
}
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});
module.exports = sequelize;