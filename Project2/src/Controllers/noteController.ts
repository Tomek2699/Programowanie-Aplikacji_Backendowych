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




module.exports = router;