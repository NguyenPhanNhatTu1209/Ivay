const express = require('express')
const { PORT } = require('./config')
const app = express()
const db = require('./config/db')
const route = require('./routes/index')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const server = require("http").Server(app);

//connect db
db.connect()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors())


app.get('/healCheck', (req, res) => res.status(200).json({hello : 'Welcome to PTSHIP v1'}))
app.use(route)


// const socket = require('./socket');

// global.io = require('socket.io').listen(server);

// socket.init();


server.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})
