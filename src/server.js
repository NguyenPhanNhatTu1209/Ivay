const express = require('express')
const { configEnv } = require('./config')
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
// app.use(cors( {
//     origin: 'http://127.0.0.1:5500/index.html',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }))
app.use(cors())


app.get('/healCheck', (req, res) => res.status(200).json({hello : 'Welcome to IVAY'}))
app.use(route)


const socket = require('./socket');

global.io = require('socket.io').listen(server);

socket.init();


server.listen(configEnv.PORT, () => {
    console.log(`App running in port ${configEnv.PORT}`)
})
