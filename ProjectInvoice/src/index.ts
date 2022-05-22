import { dbmain } from "./DataBase/DataBaseContext"

const express = require('express')
const user = require('./Controllers/userController')
const cookieParser = require('cookie-parser') 

dbmain();

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/user', user)

app.listen(3000)