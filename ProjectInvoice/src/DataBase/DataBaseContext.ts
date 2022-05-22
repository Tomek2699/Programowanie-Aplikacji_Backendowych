import { ChangeStreamDocument } from "mongodb";
import mongoose from "mongoose";

const connectionString = 'mongodb+srv://Tomasz:Klaudia0305!@cluster0.u4kcw.mongodb.net/?retryWrites=true&w=majority'

export async function dbmain() {
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connectionString)
    console.log('Mongo Connected!')
}