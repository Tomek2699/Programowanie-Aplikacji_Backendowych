import mongoose from "mongoose";
const Note = require('../DataBase/noteModel')


export class NoteService {

    async AddNote(userId:any,title:string, content:string, _private:boolean, tags:Array<string>) {
        

        try {
                let lowerTags: Array<string> = new Array<string>()

                tags.forEach(element => {
                lowerTags.push(element.toLocaleLowerCase())
                });
                const newNote = new Note({
                    UserId: userId,
                    Title: title,
                    Content: content,
                    Private: _private,
                    Tags: lowerTags
            })
    
            await newNote.save(); 
            return newNote.id;
        } 
        catch (e) {
            throw e
        }
          
    }

    async GetNotes()
    {
        try{
            let notes = await Note.find({Private: false})
            return notes
        }
        catch(e){
            throw e
        }
    }

    async GetNoteById(id:any)
    {
        try{
            let note = await Note.findById(id)
            return note
        }
        catch(e){
            throw e
        }
    }

    

}