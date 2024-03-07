const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;
const schema = db.schema;

module.exports = {
    development: {
        username,
        password,
        database,
        host,
        dialect: 'postgres',
        seederStorage: 'sequelize',
        port: 5433
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            schema
        }
    }
};
