require('dotenv').config()
const db = require('./config/db')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const authRoute = require('./routes/authRoute')
const secureRoute = require('./routes/secureRoutes')
const cookieParser = require('cookie-parser')


const errorMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')


 db()
const PORT = process.env.PORT || 3001

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.SECRET));


app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user',secureRoute)
app.use(notFound)
app.use(errorMiddleware)
app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);

})