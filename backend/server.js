require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const port = process.env.PORT;

const app = express()


app.use(express.json())

app.use((req, res, next)=>{
    console.info(`${req.method} ${req.path} `)
    next()
})

app.use('/api/workouts', workoutRoutes)

//connect to DB
mongoose.connect(process.env.DB_STRING)
    .then(result => console.info('Connected to DB!'))

app.listen(port, ()=> {
    console.log(`------------------------------------------\nServer started\nPort: ${port}\n------------------------------------------`)
})