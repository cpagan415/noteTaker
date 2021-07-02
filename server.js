const fs = require('fs');
const path = require('path');
const express = require('express');
//adding to use of a unique id for notes here : https://www.npmjs.com/package/uniqid
var uniqid = require("uniqid");
const { notes }  = require('./db/notes.json');

const PORT = process.env.PORT || 3001;
const app = express();

//parsing for incoming data
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

 //note creation

 function createNote(body, noteArray)
 {
    const note = body;
    noteArray.push(note);

    fs.writeFileSync(
    
    path.join(__dirname, './db/notes.json'),
    JSON.stringify({notes: noteArray}, null, 2)
    );
     return note;
 }

 //note deletion

 function deleteNote(params, noteArray)
 {
     //referenced GitHub Gist to splice-object-array : https://gist.github.com/scottopolis/6e35cf0d53bae81e6161662e6374da04
    noteArray = notes;
    let noteId = noteArray.map(function(noteObj)
    {
        return noteObj.id
    }).indexOf(params);
    noteArray.splice(noteId, 1);

    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify({notes: noteArray}, null ,2)
    )
    return;
 }

 //validation for note creation here 
//front end
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

//back-end api
app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  app.post('/api/notes', (req,res) => {
      //for id creation
      req.body.id = uniqid();
      const note = createNote(req.body, notes);

      res.json(note);
  })

  app.delete('/api/notes/:id', (req,res) => {
    
    const note = deleteNote(req.params.id, notes);
    res.json({message: `${req.params.id} successfully deleted.`});

  })

  app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`);
})