import e, { Request, Response } from 'express';
import { NoteService } from '../Services/noteService'

const auth = require("../DataBase/authentiction")
const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())

const noteService = new NoteService();

router.post('/add',auth, async (req: Request, res: Response) => {
    const {Title, Content,Private  , Tags} = req.body;
    try
    {
        const userId = req.headers.userId
        let noteId = await noteService.AddNote(  userId,
                                                        Title,
                                                        Content,
                                                        Private,
                                                        Tags);
        res.status(200).send(`NoteId: ${noteId}`);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
})

router.put('/edit/:id', async (req: Request, res: Response) => {

    res.status(200).send("success");
})


router.delete('/delete/:id', auth, async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let note = await noteService.GetNoteById(id)
        if(!note)
        {
            res.status(400).send("Note doesn`t exists.");
        }
        const userIdNote = note.UserId
        const userIdToken = req.headers.userId
        if(userIdNote == userIdToken)
        {
            noteService.DeleteNote(id)
            res.status(200).send("Note has been deleted.");
        }
        else
        {
            res.status(400).send("Your are not the owner");
        }
    }
    catch(e)
    {
        
    }
})
router.get('/getall', async (req: Request, res: Response) => {

    let notes = await noteService.GetNotes()
    res.status(200).send(notes);
})

router.get('/get/:id', async (req: Request, res: Response) => {

    let note = await noteService.GetNoteById(req.params.id)
    res.status(200).send(note);
})


router.get('/tag/:tag', async (req: Request, res: Response) => {

    const tag:any = req.params.tag
    let notes = await noteService.GetByTag(tag)
    
    res.status(200).send(notes);
})

router.get('/user/:id', auth, async (req: Request, res: Response) => {

    const userId = req.headers.userId

    const id:any = req.params.id
    let notes = await noteService.GetByUserId(id, userId)
    res.status(200).send(notes);
})


module.exports = router;