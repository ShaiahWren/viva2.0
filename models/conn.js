'use strict';

const host = "lallah.db.elephantsql.com";
const database = "goiplsst";
const user = "goiplsst";
const password = "Z_-qhxXgv8U5Ry9TFpMzFr9ngYsypBJU";



const pgp = require('pg-promise') ({
    query: function (event) {
        console.log("QUERY:", event.query);
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password,
}

const db = pgp(options);
module.exports = db;