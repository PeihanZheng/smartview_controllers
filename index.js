// import dependencies
const express = require("express");
const mysql = require("mysql");

// create connection
const db = mysql.createConnection({
    host: "smartview-app-server.mysql.database.azure.com",
    user: "smartview@smartview-app-server",
    password: "Graymatics!1",
    database: "smartview_app",
    port: "3306"
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connection established!");
})

// initialize express js
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// listen to the gateway port
app.listen(port, () => {
    console.log("Server started on port 3000")
});

// get user data from mysql
app.get("/", (req, res) => {
    db.query("SELECT * FROM users_data", (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Data retrieved...");
        res.send(result);
    });
});

// get user data by id
app.get("/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM users_data WHERE user_id = ?", id, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(`Data retrieved for user id ${id}`);
        res.send(result);
    });
});

// insert data
app.post("/", (req, res) => {
    const data = req.body;
    db.query("INSERT INTO users_data SET ?", data, (err, result, field) => {
        if (err) {
            throw err;
        }
        console.log("Data added...");
        res.send(result);
    });
});

// update information for existing user data
app.put("/:id", (req, res) => {
    const data = req.body;
    const id = req.params.id;
    db.query("UPDATE users_data SET ? WHERE user_id = ?", [data, id], (err, result, field) => {
        if (err) {
            throw err;
        }
        console.log("Data updated...");
        res.send(result);
    });
});

// delete user data by id
app.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM users_data WHERE user_id = ?", id, (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Data deleted...");
        res.send(result);
    });
});