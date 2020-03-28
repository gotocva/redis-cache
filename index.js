const express = require("express");
const Redis = require("./redis");
const { connection } = require("./mysql");

const env = require("dotenv").config().parsed;

const redis = new Redis();
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());

app.get('/search-user', (req, res) => {
    const sql = `SELECT * FROM users WHERE email = "${req.query.email}"`;
    connection.query(
        sql,
        function(err, results, fields) {
            // user exists on database 
            if (results.length != 0) {
                res.json(results[0]);
            } else {
                // user not found on database
                res.json({ "error": "user not found" });
            }
        }
    );
});

app.get('/search-user-with-cache', (req, res) => {

    const sql = `SELECT * FROM users WHERE email = "${req.query.email}"`;

    // check for cache
    redis.get_set({ "id": sql }, null, function(response) {
        if (response) {
            res.status(200).json(response);
        } else {
            connection.query(
                sql,
                function(err, results, fields) {
                    // user exists on database 
                    if (results.length != 0) {
                        res.json(results[0]);
                        // put response into cache
                        redis.add_set({ key: { "id": sql }, data: results[0] }, function(response) {});
                    } else {
                        // user not found on database
                        res.json({ "error": "user not found" });
                    }
                }
            );
        }
    });

});

app.delete('/search-user', (req, res) => {
    const sql = `SELECT * FROM users WHERE email = "${req.query.email}"`;
    redis.delete_set({ "id": sql }, function(response) {});
    res.json({ "message": "removed from cache" });
});

app.listen(env.PORT, () => { console.log(`app running on port ${env.PORT}`) });