require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const app = express();
const { readdirSync } = require('fs'); // readdirsync -> will read information in a specified file/directory, fs -> file system

// Middlewarres
app.use(cors()) // using this so that we don't have any issue accessing the servers (cross origin -> running on differnt machines)
app.use(express.json()) // as we are going to work with json objects


// Routes
readdirSync('./routes') // Will read all the files in the routes folder
    .map((route) => // naming each file in routes folder as route
        app.use("/api/v1", // BASE_URL
            require('./routes/' + route)))


const PORT = process.env.server_port;

app.get('/', (req, res) => { 
    res.send("Hello World!")
})

const server = () => {
    db()
    app.listen(PORT, () => { 
        console.log('You are listening to PORT : ', PORT)
    })
}

server()