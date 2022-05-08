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

    async GetByTag(tag:string)
    {
        let notes = await Note.find({ Tags: tag })
        return notes
    }

    async GetByUserId(id:any, userId:any)
    {
        if(userId==id)
        {
            let notes = await Note.find({ UserId:id })
            return notes
        }
        else
        {
            let notes = await Note.find({ UserId:id , Private: false})
            return notes
        }

    }

    async DeleteNote(id:any)
    {
        try
        {
            await Note.findByIdAndRemove(id)
        }
        catch(e)
        {
            throw e
        }
    }

}