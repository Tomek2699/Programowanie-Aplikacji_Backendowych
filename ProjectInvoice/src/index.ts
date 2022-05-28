import { dbmain } from "./DataBase/DataBaseContext"

const express = require('express')
const invoice = require('./Controllers/invoiceController')
const ourCompany = require('./Controllers/ourCompanyController')
const foreignCompany = require('./Controllers/foreignCompanyController')
const commodity = require('./Controllers/commodityController')
const user = require('./Controllers/userController')
const cookieParser = require('cookie-parser') 

dbmain();

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/invoice', invoice)
app.use('/ourCompany', ourCompany)
app.use('/foreignCompany', foreignCompany)
app.use('/commodity', commodity)
app.use('/user', user)

app.listen(3000)