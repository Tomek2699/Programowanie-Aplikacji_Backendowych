import mongoose from "mongoose";


const connString = 'mongodb+srv://tomek:hBJsSTMGfsatBfm36@cluster0.xrh3s.mongodb.net/NoteKeep?retryWrites=true&w=majority'


export async function dbmain() {
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

}