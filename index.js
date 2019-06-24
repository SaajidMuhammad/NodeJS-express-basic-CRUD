const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('./config.js');

const app = express();

// middlewears
app.use(bodyParser.json());

//Create Connection
const connection = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database
});

// connect to DB
connection.connect();

// insert user table
app.get('/insertUser', (req, res) => {
    let sql = "INSERT INTO user(name, email) VALUES ('Muhamamd','Muhammad@yahoo.com')";

    connection.query(sql,(error) => {
        if (error) throw error;
        res.send('user added');
    });
});

// get all user
app.get('/users', (req, res) => {
    let sql = `SELECT * FROM user`;

    connection.query(sql,(error,result) => {
        if (error) throw error;    
        res.json(result);
    });
});

// get user by id
app.get('/users/:id', (req, res) => {
    let sql = `SELECT * FROM user WHERE id = ${req.params.id}`;
    
    connection.query(sql,(error,result) => {
        if (error) throw error;    
        res.json(result);
    });
});

// create new user
app.post('/users', (req, res) => {

    let newUser = req.body.name;
    let newUserEmail = req.body.email;

    let sql = `INSERT INTO user (name, email) VALUES ('${newUser}','${newUserEmail}')`;

    connection.query(sql,(error) => {
        if (error) throw error;
        res.send('new user added');
    });
});


// update user by id
app.put('/users/:id', (req, res) => {

    let newName = req.body.name;
    let newEmail = req.body.email;

    console.log(newName, newEmail);

    let sql = `UPDATE user SET name = '${newName}', email = '${newEmail}' WHERE id = '${req.params.id}'`;    

    connection.query(sql, (error) => {
        if (error) throw error;
        res.send('user updated');
    });
});


// delete user by id
app.delete('/users/:id', (req, res) => {

    let sql = `DELETE FROM user WHERE id = ${req.params.id}`; 
    connection.query(sql,(error,result) => {
        if (error) throw error;    
        res.send(`user Deleted`);
    });
});


// start server
app.listen(8080, (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("server running in 8080")
});