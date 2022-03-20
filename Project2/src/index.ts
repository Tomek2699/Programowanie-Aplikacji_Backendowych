import express from 'express'
import {Request, Response} from 'express'
import { note } from './note'

const app = express()

app.use(express.json())

const notes: Array<note> = new Array();

app.get('/getall', function (req: Request, res: Response) {
  res.send(notes)
})

app.get('/getnote/:id', function (req: Request, res: Response) {
    let id = req.params.id;
    let note = notes.filter(x => x.id == +id)

    if(notes.findIndex(x => x.id == +id) == -1)
    {
        res.status(404).send("Note doesn`t exist!")
    }
    else
    {
        res.status(200).send(note);
    }
})

app.delete('/delete/:id', function (req: Request, res: Response) {
    let id  = req.params.id;
    
    if(notes.findIndex(x =>x.id == +id) == -1)
    {
      res.status(404).send("Wrong Id!")
    }
    else
    {
      notes.splice(notes.findIndex(x =>x.id == +id), 1)
      res.status(200).send("Note deleted.")
    }
  })

app.put('/update/:id', function (req: Request, res: Response) {
    let id  = req.params.id;
    if(notes.findIndex(x =>x.id == +id) == -1)
    {
      res.status(404).send("Note doesn`t exist!")
    }
    else
    {
      if(req.body.title){
        notes[notes.findIndex(x =>x.id == +id)].title = req.body.title
      }
      if(req.body.content){
        notes[notes.findIndex(x =>x.id == +id)].content = req.body.content
      }
      res.status(200).send("Note updated.")
    }
  })

app.post('/note', function (req: Request, res: Response) {
    if(req.body.title === "" || req.body.content === "")
    {
        res.status(400).send("Title and content can't be empty!")
    }
    else
    {
        console.log(req.body);
        let id = notes.length;
        id++;
        let Note: note = new note(req.body.title, req.body.content, id)
        notes.push(Note);
    }
})



app.listen(3000)