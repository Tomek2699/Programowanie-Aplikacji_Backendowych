import { dbmain } from "./DataBase/connectionDB"

const express = require('express')  
const note = require('./controllers/noteController')
const user = require('./controllers/userController')
const cookieParser = require('cookie-parser')


dbmain();
const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/notes', note)
app.use('/user', user)


app.listen(1000)