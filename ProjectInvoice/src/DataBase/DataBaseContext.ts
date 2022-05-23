import { ChangeStreamDocument } from "mongodb";
import mongoose from "mongoose";
const {ourCompanySchema, foreignCompanySchema, commoditySchema, invoiceSchema} = require('../DataBase/schemas')

const connectionString = 'mongodb+srv://tomek:hBJsSTMGYbtBfm36@cluster0.xrh3s.mongodb.net/projectinvoice?retryWrites=true&w=majority'

export async function dbmain() {
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connectionString)
    console.log('Mongo Connected!')
}