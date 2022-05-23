
'use strict';
require('dotenv').config({path:'./../.env'});
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Mothaiba@$%^',
        database: 'entrance_test'
    },
    pool: { min: 0, max: 7 }
});

console.log(process.env.HOST_TEST)

module.exports  = { knex }