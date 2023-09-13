require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const noteRoutes = require('./routes/notes')

const port = process.env.PORT || 5000

// express app
const app = express()

//  middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//  middleware for handling CORS policy

// option 1
app.use(cors())

// option 2
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

// routes
app.use('/api/notes', noteRoutes)

// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(port, () => {
            console.log('Connected to db & listening on port', port)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })
